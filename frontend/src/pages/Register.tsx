import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { RegisterRequest, UserRole } from '../api/types';

export function Register() {
  const [formData, setFormData] = useState<RegisterRequest>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    role: 'CLIENT',
    address: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      if (response.status === 'SUCCESS') {
        authApi.login({ email: formData.email, password: formData.password })
          .then((loginResponse) => {
            if (loginResponse.status === 'SUCCESS' && loginResponse.token) {
              login(loginResponse.token);
              navigate('/products');
            }
          })
          .catch(() => {
            navigate('/login');
          });
      } else {
        setError(response.message || 'Registration failed');
      }
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : 'Registration failed');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    registerMutation.mutate(formData);
  };

  const updateField = (field: keyof RegisterRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-ink mb-2">Create account</h1>
          <p className="text-graphite text-sm sm:text-base">Join RoyalCommerce today</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-cream border border-stone shadow-lg">
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-burgundy/10 border border-burgundy/20 text-burgundy text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['CLIENT', 'ADMIN'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => updateField('role', role)}
                    className={`p-3 sm:p-4 rounded-xl border text-center transition-all ${
                      formData.role === role
                        ? 'bg-navy/10 border-navy text-navy'
                        : 'bg-ivory border-stone text-graphite hover:border-navy/30'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl mb-1">{role === 'CLIENT' ? '🛍️' : '👔'}</div>
                    <div className="text-xs sm:text-sm font-medium">{role === 'CLIENT' ? 'Customer' : 'Admin'}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5 sm:mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all text-sm sm:text-base"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5 sm:mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all text-sm sm:text-base"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5 sm:mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all text-sm sm:text-base"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5 sm:mb-2">
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                required
                minLength={6}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all text-sm sm:text-base"
                placeholder="••••••••"
              />
            </div>

            {/* Address & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5 sm:mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all text-sm sm:text-base"
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5 sm:mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all text-sm sm:text-base"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full mt-6 py-3 sm:py-4 rounded-xl font-display font-semibold text-ivory bg-navy hover:bg-navy-deep hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {registerMutation.isPending ? (
              <>
                <LoadingSpinner size="sm" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <p className="mt-4 sm:mt-6 text-center text-graphite text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-navy hover:text-navy-deep font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
