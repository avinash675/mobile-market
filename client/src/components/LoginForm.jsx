import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import SocialLoginButtons from './SocialLoginButtons';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(); 
    navigate('/splash');
  };

  return (
    <div className="w-full max-w-md px-4">
      <Card padding="xl" className="bg-white/80 backdrop-blur-xl border border-white/20">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <span className="text-heading-2 text-primary italic logo-mobixa">
              Mobixa<span className="inline-block h-2 w-2 bg-accent rounded-full ml-1"></span>
            </span>
          </Link>
          <h2 className="text-heading-3 text-primary mb-2 uppercase tracking-tighter">Welcome Back</h2>
          <p className="text-body-sm text-secondary">
            Enter your credentials to access your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Email Address"
            type="email" 
            placeholder="name@company.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <div className="space-y-1">
            <div className="flex justify-between items-center px-1">
              <label className="text-caption font-bold text-secondary uppercase tracking-widest">Password</label>
              <Link to="/forgot-password" hidden className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline underline-offset-4">Forgot?</Link>
            </div>
            <Input 
              type="password" 
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <Button 
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4"
          >
            Login to Account
          </Button>
        </form>

        <div className="mt-10 mb-8 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-border"></div>
          <span className="text-caption text-secondary uppercase font-bold tracking-[0.3em]">Or Partner Login</span>
          <div className="h-[1px] flex-1 bg-border"></div>
        </div>

        <SocialLoginButtons />

        <div className="mt-10 text-center">
          <p className="text-body-sm text-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent font-bold hover:underline underline-offset-4 uppercase tracking-widest ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
