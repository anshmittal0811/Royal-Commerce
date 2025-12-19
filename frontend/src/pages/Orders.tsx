import { Link } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import { PageLoader } from '../components/LoadingSpinner';

const statusColors: Record<string, string> = {
  PENDING: 'bg-gold/20 text-gold-muted border-gold/30',
  PROCESSING: 'bg-lavender/20 text-lavender border-lavender/30',
  COMPLETED: 'bg-sage/20 text-sage border-sage/30',
};

export function Orders() {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) return <PageLoader />;

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😵</div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">
            Failed to load orders
          </h2>
          <p className="text-graphite text-sm sm:text-base">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl sm:text-7xl mb-6">📋</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2">No orders yet</h2>
          <p className="text-graphite mb-6 sm:mb-8 text-sm sm:text-base">Start shopping to see your orders here</p>
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
      <div className="mb-8 sm:mb-12">
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-ink mb-1 sm:mb-2">My Orders</h1>
        <p className="text-graphite text-sm sm:text-base">{orders.length} order(s)</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {orders.map((order) => (
          <Link
            key={order.orderId}
            to={`/orders/${order.orderId}`}
            className="block p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-cream border border-stone hover:border-navy/30 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-parchment flex items-center justify-center shrink-0">
                  <span className="text-xl sm:text-2xl">📦</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-base sm:text-lg text-ink">
                    Order #{order.orderId}
                  </h3>
                  <p className="text-graphite text-xs sm:text-sm">
                    {order.orderDate && new Date(order.orderDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                    <span className="mx-2">•</span>
                    {order.items?.length ?? 0} item(s)
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 pl-[64px] sm:pl-0">
                <span className="font-display font-bold text-lg sm:text-xl text-navy">
                  ${(order.totalAmount || 0).toFixed(2)}
                </span>
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${
                    statusColors[order.orderStatus] || statusColors.PENDING
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
            </div>
            {order.orderStatus === 'PENDING' && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-stone flex items-center justify-between text-xs sm:text-sm">
                <span className="text-graphite">Payment required</span>
                <span className="text-navy font-medium flex items-center gap-1">
                  Pay Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
