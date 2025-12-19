import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

export function Navbar() {
  const { isAuthenticated, isAdmin, isClient, user, logout } = useAuth();
  const navigate = useNavigate();
  const { data: cart } = useCart(isAuthenticated && isClient);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const cartItemCount = isClient ? (cart?.cartItems?.length ?? 0) : 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-stone bg-cream/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-navy flex items-center justify-center">
              <span className="text-ivory font-display font-bold text-xs sm:text-sm">RC</span>
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-ink">
              Royal<span className="text-burgundy">Commerce</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/products" className="text-graphite hover:text-navy transition-colors font-medium">
                  Products
                </Link>

                {isAdmin && (
                  <>
                    <Link to="/admin/products" className="text-burgundy/80 hover:text-burgundy transition-colors font-medium">
                      Manage Products
                    </Link>
                    <Link to="/admin/orders" className="text-burgundy/80 hover:text-burgundy transition-colors font-medium">
                      All Orders
                    </Link>
                  </>
                )}

                {isClient && (
                  <>
                    <Link to="/cart" className="relative text-graphite hover:text-navy transition-colors font-medium">
                      Cart
                      {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-3 h-5 w-5 rounded-full bg-burgundy text-xs font-bold flex items-center justify-center text-ivory">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                    <Link to="/orders" className="text-graphite hover:text-navy transition-colors font-medium">
                      My Orders
                    </Link>
                  </>
                )}

                <div className="flex items-center gap-3 pl-4 border-l border-stone">
                  <div className="text-right">
                    <p className="text-sm text-graphite truncate max-w-[120px]">{user?.sub}</p>
                    <span className={`text-xs font-medium ${isAdmin ? 'text-burgundy' : 'text-navy'}`}>
                      {user?.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-ivory bg-burgundy rounded-lg hover:bg-wine transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-graphite hover:text-navy transition-colors font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 font-medium text-ivory bg-navy rounded-lg hover:bg-navy-deep transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-graphite hover:text-navy transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone py-4 space-y-2">
            {isAuthenticated ? (
              <>
                <div className="px-2 py-2 mb-2 bg-parchment rounded-xl">
                  <p className="text-sm text-graphite truncate">{user?.sub}</p>
                  <span className={`text-xs font-medium ${isAdmin ? 'text-burgundy' : 'text-navy'}`}>
                    {user?.role}
                  </span>
                </div>

                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-ink hover:bg-parchment transition-colors font-medium"
                >
                  Products
                </Link>

                {isAdmin && (
                  <>
                    <Link
                      to="/admin/products"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-burgundy hover:bg-parchment transition-colors font-medium"
                    >
                      Manage Products
                    </Link>
                    <Link
                      to="/admin/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-burgundy hover:bg-parchment transition-colors font-medium"
                    >
                      All Orders
                    </Link>
                  </>
                )}

                {isClient && (
                  <>
                    <Link
                      to="/cart"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-ink hover:bg-parchment transition-colors font-medium"
                    >
                      <span>Cart</span>
                      {cartItemCount > 0 && (
                        <span className="h-6 w-6 rounded-full bg-burgundy text-xs font-bold flex items-center justify-center text-ivory">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-ink hover:bg-parchment transition-colors font-medium"
                    >
                      My Orders
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full mt-2 px-4 py-3 text-left rounded-xl font-medium text-ivory bg-burgundy hover:bg-wine transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-ink hover:bg-parchment transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl font-medium text-ivory bg-navy hover:bg-navy-deep transition-colors text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
