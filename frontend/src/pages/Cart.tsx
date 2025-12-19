import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart, useRemoveFromCart, useClearCart } from '../hooks/useCart';
import { useCreateOrder } from '../hooks/useOrders';
import { PageLoader, LoadingSpinner } from '../components/LoadingSpinner';

export function Cart() {
  const { isAuthenticated, isClient } = useAuth();
  const { data: cart, isLoading, error } = useCart(isAuthenticated && isClient);
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();
  const createOrder = useCreateOrder();

  if (isLoading) return <PageLoader />;

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😵</div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">
            Failed to load cart
          </h2>
          <p className="text-graphite text-sm sm:text-base">Please try again later</p>
        </div>
      </div>
    );
  }

  const items = cart?.cartItems ?? [];
  const total = cart?.total ?? 0;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl sm:text-7xl mb-6">🛒</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2">Your cart is empty</h2>
          <p className="text-graphite mb-6 sm:mb-8 text-sm sm:text-base">Add some products to get started</p>
          <Link
            to="/products"
            className="inline-block px-6 sm:px-8 py-3 font-display font-semibold text-ivory bg-navy rounded-xl hover:bg-navy-deep transition-all text-sm sm:text-base"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-ink mb-1 sm:mb-2">Shopping Cart</h1>
          <p className="text-graphite text-sm sm:text-base">{items.length} item(s) in your cart</p>
        </div>
        <button
          onClick={() => clearCart.mutate()}
          disabled={clearCart.isPending}
          className="px-4 py-2 text-burgundy border border-burgundy/30 rounded-xl hover:bg-burgundy/10 transition-all text-sm sm:text-base"
        >
          {clearCart.isPending ? 'Clearing...' : 'Clear Cart'}
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-cream border border-stone"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-parchment flex items-center justify-center shrink-0">
                <span className="text-2xl sm:text-3xl">📦</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-semibold text-base sm:text-lg text-ink truncate">{item.nameProduct}</h3>
                <p className="text-graphite text-sm">
                  ${(item.unitPrice || 0).toFixed(2)} × {item.quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 pl-[70px] sm:pl-0">
              <span className="font-display font-bold text-lg sm:text-xl text-navy">
                ${((item.unitPrice || 0) * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart.mutate(item.idProduct)}
                disabled={removeFromCart.isPending}
                className="p-2 text-burgundy hover:bg-burgundy/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-cream border border-stone">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <span className="text-graphite text-base sm:text-lg">Total Amount</span>
          <span className="font-display font-bold text-2xl sm:text-3xl text-navy">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => createOrder.mutate()}
          disabled={createOrder.isPending}
          className="w-full py-3 sm:py-4 rounded-xl font-display font-semibold text-ivory bg-navy hover:bg-navy-deep hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {createOrder.isPending ? (
            <>
              <LoadingSpinner size="sm" />
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Place Order
            </>
          )}
        </button>
      </div>
    </div>
  );
}
