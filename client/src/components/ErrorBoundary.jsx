import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Check for ChunkLoadError (either by name or message string matching)
    if (error.name === 'ChunkLoadError' || (error.message && error.message.includes('Loading chunk'))) {
      const hasReloaded = sessionStorage.getItem('chunk-error-reloaded');
      if (!hasReloaded) {
        sessionStorage.setItem('chunk-error-reloaded', 'true');
        window.location.reload();
      } else {
        // Clear flag to avoid infinite loops if it still fails
        sessionStorage.removeItem('chunk-error-reloaded');
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bgLight dark:bg-slate-950 text-textDark dark:text-white">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Something went wrong.</h2>
            <p className="text-gray-500 dark:text-gray-400">We're having trouble loading this page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
