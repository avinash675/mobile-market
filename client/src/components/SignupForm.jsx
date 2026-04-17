import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import SocialLoginButtons from './SocialLoginButtons';

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Using context if needed later, currently unused
  // const { login } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "0000000000",
          password: formData.password
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Signup failed");
      }

      await response.json(); // Consume stream

      // success
      alert("Account created successfully");
      navigate("/login");

    } catch (error) {
      console.error(error);

      if (error.message === "Failed to fetch") {
        setError("Server not reachable");
      } else {
        setError(error.message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <Card 
        padding="lg"
        className="bg-white/70 backdrop-blur-xl border-white/20"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <span className="text-heading-2 italic tracking-tighter text-primary logo-mobixa group">
              Mobixa<span className="inline-block h-2 w-2 bg-accent rounded-full ml-1"></span>
            </span>
          </Link>
          <h2 className="text-heading-3 text-primary mb-2 uppercase">Create Account</h2>
          <p className="text-secondary font-medium text-body-sm leading-relaxed">
            Join the premium electronics marketplace today.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Full Name"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />

          <Input 
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Password"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <Input 
              label="Confirm"
              type="password"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>
          
          <Button 
            type="submit"
            variant="primary"
            className="w-full py-4 mt-4"
            disabled={loading}
          >
            {loading ? "Processing..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-8 mb-6 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-border"></div>
          <span className="text-[10px] text-secondary/50 uppercase font-black tracking-[0.3em]">Or Partner Signup</span>
          <div className="h-[1px] flex-1 bg-border"></div>
        </div>

        <SocialLoginButtons />

        <div className="mt-8 text-center">
          <p className="text-body-sm font-medium text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-accent font-black hover:underline underline-offset-4 uppercase tracking-widest text-[11px] ml-1">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignupForm;
