import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '../api/orders';
import { PageLoader } from '../components/LoadingSpinner';

const statusColors: Record<string, string> = {
  PENDING: 'bg-gold/20 text-gold-muted border-gold/30',
  PROCESSING: 'bg-lavender/20 text-lavender border-lavender/30',
  COMPLETED: 'bg-sage/20 text-sage border-sage/30',
};

export function AdminOrders() {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: ordersApi.getAll,
  });

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

  const isEmpty = !orders || orders.length === 0;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8 sm:mb-12">
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-ink mb-1 sm:mb-2">All Orders</h1>
        <p className="text-graphite text-sm sm:text-base">
          {isEmpty ? 'No orders yet' : `${orders.length} order(s) in system`}
        </p>
      </div>

      {isEmpty ? (
        <div className="text-center py-16 sm:py-20">
          <div className="text-5xl sm:text-6xl mb-4">📋</div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink mb-4">No orders yet</h2>
          <p className="text-graphite text-sm sm:text-base">Orders will appear here once customers start purchasing.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block rounded-2xl bg-cream border border-stone overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone bg-parchment">
                  <th className="px-4 py-3 text-left text-sm font-medium text-graphite">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-graphite">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-graphite">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-graphite">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-graphite">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-graphite">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId} className="border-b border-stone/50 hover:bg-parchment/50">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-graphite">#{order.orderId}</span>
                    </td>
                    <td className="px-4 py-3 text-ink font-medium">
                      {order.name} {order.lastName}
                    </td>
                    <td className="px-4 py-3 text-graphite text-sm">{order.email}</td>
                    <td className="px-4 py-3 text-graphite text-sm">
                      {order.orderDate && new Date(order.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3 text-navy font-bold">
                      ${(order.totalAmount || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          statusColors[order.orderStatus] || statusColors.PENDING
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="p-4 rounded-xl bg-cream border border-stone"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm text-graphite">#{order.orderId}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                      statusColors[order.orderStatus] || statusColors.PENDING
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <div className="mb-2">
                  <h3 className="font-medium text-ink">{order.name} {order.lastName}</h3>
                  <p className="text-graphite text-sm truncate">{order.email}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-graphite">
                    {order.orderDate && new Date(order.orderDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-navy font-bold text-base">${(order.totalAmount || 0).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
