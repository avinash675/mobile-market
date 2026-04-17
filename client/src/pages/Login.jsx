import React from 'react';
import LoginBannerSlider from '../components/LoginBannerSlider';
import { LoginForm } from '../components/AuthForms';

function Login() {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-white dark:bg-[#09090b] overflow-hidden">
      {/* Left — visual banner */}
      <div className="w-full lg:w-1/2 h-[38vh] lg:h-full relative overflow-hidden flex-shrink-0">
        <LoginBannerSlider />
        <div className="hidden lg:block absolute top-12 left-12 z-20">
          <span className="text-2xl font-black italic tracking-tight text-white">Mobixa.</span>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Right — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-16 py-12 lg:py-0 bg-white dark:bg-[#09090b] overflow-y-auto">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
