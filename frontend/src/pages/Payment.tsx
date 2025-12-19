import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOrderForPayment, useCreatePayment } from '../hooks/useOrders';
import { PageLoader, LoadingSpinner } from '../components/LoadingSpinner';
import type { PaymentMethod } from '../api/types';

const paymentMethods: { value: PaymentMethod; label: string; icon: string }[] = [
  { value: 'CARD', label: 'Credit/Debit Card', icon: '💳' },
  { value: 'PAYPAL', label: 'PayPal', icon: '🅿️' },
  { value: 'UPI', label: 'UPI', icon: '📱' },
  { value: 'BANK_TRANSFER', label: 'Bank Transfer', icon: '🏦' },
];

const currencies = [
  { value: 'USD', label: 'US Dollar', symbol: '$' },
  { value: 'EUR', label: 'Euro', symbol: '€' },
  { value: 'INR', label: 'Indian Rupee', symbol: '₹' },
  { value: 'GBP', label: 'British Pound', symbol: '£' },
];

export function Payment() {
  const { id } = useParams<{ id: string }>();
  const orderId = parseInt(id || '0');
  const navigate = useNavigate();
  
  const { data: order, isLoading, error } = useOrderForPayment(orderId);
  const createPayment = useCreatePayment();
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('CARD');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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

  if (order.orderStatus === 'COMPLETED') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-sage mb-2">Already Paid</h2>
          <p className="text-graphite mb-6 text-sm sm:text-base">This order has already been paid.</p>
          <Link
            to={`/orders/${orderId}`}
            className="inline-block px-6 py-3 text-navy border border-navy/30 rounded-xl hover:bg-navy/5 transition-all text-sm sm:text-base"
          >
            View Order Details
          </Link>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      await createPayment.mutateAsync({
        orderId,
        method: selectedMethod,
        amount: order.totalAmount,
        currency: selectedCurrency,
        description: `Payment for Order #${orderId}`,
      });
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate(`/orders/${orderId}`);
      }, 2000);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="flex flex-col text-center justify-center items-center">
          <div className="text-6xl sm:text-7xl mb-6 animate-bounce">🎉</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-sage mb-2">Payment Successful!</h2>
          <p className="text-graphite mb-6 text-sm sm:text-base">Redirecting to your order...</p>
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  const currentCurrency = currencies.find(c => c.value === selectedCurrency) || currencies[0];

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
      <Link
        to={`/orders/${orderId}`}
        className="inline-flex items-center gap-2 text-graphite hover:text-ink transition-colors mb-6 sm:mb-8 text-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to order
      </Link>

      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-ink mb-1 sm:mb-2">Complete Payment</h1>
        <p className="text-graphite text-sm sm:text-base">Order #{orderId}</p>
      </div>

      {/* Order Summary */}
      <div className="rounded-xl sm:rounded-2xl bg-cream border border-stone p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="font-display font-semibold text-base sm:text-lg text-ink mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm sm:text-base">
          {order.items?.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span className="text-graphite truncate mr-2">{item.nameProduct} × {item.quantity}</span>
              <span className="text-ink font-medium shrink-0">${(item.totalPrice || 0).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-stone mt-4 pt-4 flex justify-between items-center">
          <span className="text-graphite text-base sm:text-lg">Total</span>
          <span className="font-display font-bold text-xl sm:text-2xl text-navy">
            {currentCurrency.symbol}{order.totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Currency Selection */}
      <div className="rounded-xl sm:rounded-2xl bg-cream border border-stone p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="font-display font-semibold text-base sm:text-lg text-ink mb-4">Select Currency</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {currencies.map((currency) => (
            <button
              key={currency.value}
              onClick={() => setSelectedCurrency(currency.value)}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedCurrency === currency.value
                  ? 'bg-navy/10 border-navy text-navy'
                  : 'bg-ivory border-stone text-graphite hover:border-navy/30'
              }`}
            >
              <div className="text-xl sm:text-2xl font-medium mb-1">{currency.symbol}</div>
              <div className="text-xs text-graphite">{currency.value}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="rounded-xl sm:rounded-2xl bg-cream border border-stone p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="font-display font-semibold text-base sm:text-lg text-ink mb-4">Payment Method</h2>
        <div className="space-y-2 sm:space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.value}
              onClick={() => setSelectedMethod(method.value)}
              className={`w-full p-3 sm:p-4 rounded-xl border flex items-center gap-3 sm:gap-4 transition-all ${
                selectedMethod === method.value
                  ? 'bg-navy/10 border-navy'
                  : 'bg-ivory border-stone hover:border-navy/30'
              }`}
            >
              <span className="text-2xl sm:text-3xl">{method.icon}</span>
              <span className={`font-medium text-sm sm:text-base ${
                selectedMethod === method.value ? 'text-navy' : 'text-ink'
              }`}>
                {method.label}
              </span>
              {selectedMethod === method.value && (
                <svg className="w-5 h-5 ml-auto text-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={createPayment.isPending}
        className="w-full py-3 sm:py-4 rounded-xl font-display font-semibold text-ivory bg-navy hover:bg-navy-deep hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-base sm:text-lg"
      >
        {createPayment.isPending ? (
          <>
            <LoadingSpinner size="sm" />
            Processing Payment...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pay {currentCurrency.symbol}{order.totalAmount.toFixed(2)}
          </>
        )}
      </button>

      {createPayment.isError && (
        <div className="mt-4 p-4 rounded-xl bg-burgundy/10 border border-burgundy/20 text-burgundy text-center text-sm sm:text-base">
          Payment failed. Please try again.
        </div>
      )}
    </div>
  );
}
