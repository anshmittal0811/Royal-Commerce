import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOrderDetails } from '../hooks/useOrders';
import { PageLoader } from '../components/LoadingSpinner';

const statusColors: Record<string, string> = {
  PENDING: 'bg-gold/20 text-gold-muted border-gold/30',
  PROCESSING: 'bg-lavender/20 text-lavender border-lavender/30',
  COMPLETED: 'bg-sage/20 text-sage border-sage/30',
};

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const orderId = parseInt(id || '0');
  const { data: order, isLoading, error } = useOrderDetails(orderId);
  const navigate = useNavigate();

  if (isLoading) return <PageLoader />;

  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😵</div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">Order not found</h2>
          <Link
            to="/orders"
            className="inline-block mt-4 text-navy hover:text-navy-deep transition-colors text-sm sm:text-base"
          >
            ← Back to orders
          </Link>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    navigate(`/payment/${orderId}`);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      <Link
        to="/orders"
        className="inline-flex items-center gap-2 text-graphite hover:text-ink transition-colors mb-6 sm:mb-8 text-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-ink mb-1 sm:mb-2">Order #{order.orderId}</h1>
          <p className="text-graphite text-sm sm:text-base">
            {order.orderDate && new Date(order.orderDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <span
          className={`self-start px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border ${
            statusColors[order.orderStatus] || statusColors.PENDING
          }`}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* Order items */}
      <div className="rounded-xl sm:rounded-2xl bg-cream border border-stone overflow-hidden mb-4 sm:mb-6">
        <div className="p-4 sm:p-6 border-b border-stone">
          <h2 className="font-display font-semibold text-base sm:text-lg text-ink">Order Items</h2>
        </div>
          {order.items && order.items.length > 0 ? (
          order.items.map((item: typeof order.items[0], index: number) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 ${
                index !== order.items.length - 1 ? 'border-b border-stone' : ''
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-parchment flex items-center justify-center shrink-0">
                  <span className="text-lg sm:text-xl">📦</span>
                </div>
                <div>
                  <h3 className="font-medium text-ink text-sm sm:text-base">{item.nameProduct}</h3>
                  <p className="text-xs sm:text-sm text-graphite">
                    ${(item.unitPrice || 0).toFixed(2)} × {item.quantity}
                  </p>
                </div>
              </div>
              <span className="font-display font-bold text-ink pl-[52px] sm:pl-0 text-base sm:text-lg">
                ${(item.totalPrice || 0).toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-graphite text-sm">No items in this order</div>
        )}
      </div>

      {/* Order summary */}
      <div className="rounded-xl sm:rounded-2xl bg-cream border border-stone p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <span className="text-graphite text-base sm:text-lg">Total Amount</span>
          <span className="font-display font-bold text-2xl sm:text-3xl text-navy">
            ${(order.totalAmount || 0).toFixed(2)}
          </span>
        </div>

        {order.orderStatus === 'PENDING' && (
          <button
            onClick={handlePayment}
            className="w-full py-3 sm:py-4 rounded-xl font-display font-semibold text-ivory bg-navy hover:bg-navy-deep hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Proceed to Payment
          </button>
        )}

        {order.orderStatus === 'COMPLETED' && (
          <div className="text-center p-4 rounded-xl bg-sage/10 border border-sage/20">
            <div className="text-2xl sm:text-3xl mb-2">✅</div>
            <p className="text-sage font-medium text-sm sm:text-base">Payment completed successfully!</p>
          </div>
        )}

        {order.orderStatus === 'PROCESSING' && (
          <div className="text-center p-4 rounded-xl bg-lavender/10 border border-lavender/20">
            <div className="text-2xl sm:text-3xl mb-2">⏳</div>
            <p className="text-lavender font-medium text-sm sm:text-base">Order is being processed...</p>
          </div>
        )}
      </div>
    </div>
  );
}
