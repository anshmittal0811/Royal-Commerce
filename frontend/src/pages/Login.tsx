import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { LoginRequest } from '../api/types';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      if (response.status === 'SUCCESS' && response.token) {
        login(response.token);
        navigate('/products');
      } else {
        setError(response.message || 'Login failed');
      }
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : 'Login failed');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-ink mb-2">Welcome back</h1>
          <p className="text-graphite text-sm sm:text-base">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-cream border border-stone shadow-lg">
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-burgundy/10 border border-burgundy/20 text-burgundy text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5 sm:mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all text-sm sm:text-base"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5 sm:mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all text-sm sm:text-base"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full mt-6 py-3 sm:py-4 rounded-xl font-display font-semibold text-ivory bg-navy hover:bg-navy-deep hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {loginMutation.isPending ? (
              <>
                <LoadingSpinner size="sm" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          <p className="mt-4 sm:mt-6 text-center text-graphite text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-navy hover:text-navy-deep font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
