import type { Product } from '../api/types';
import { useAddToCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from './LoadingSpinner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isClient } = useAuth();
  const addToCart = useAddToCart();

  const handleAddToCart = () => {
    addToCart.mutate({ productId: product.id, quantity: 1 });
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-cream border border-stone hover:border-navy/30 hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="aspect-square overflow-hidden bg-parchment">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`h-full w-full flex items-center justify-center ${product.imageUrl ? 'hidden' : ''}`}>
          <div className="text-5xl sm:text-6xl opacity-30">📦</div>
        </div>
      </div>
      
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-sm sm:text-lg text-ink mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-graphite line-clamp-2 mb-3 sm:mb-4 h-8 sm:h-10">
          {product.description}
        </p>
        
        {/* Price and stock - always visible */}
        <div className="flex items-center justify-between gap-2 sm:mb-0 mb-3">
          <div>
            <span className="text-lg sm:text-2xl font-display font-bold text-navy">
              ${product.price.toFixed(2)}
            </span>
            <p className={`text-xs mt-0.5 sm:mt-1 ${isOutOfStock ? 'text-burgundy' : 'text-sage'}`}>
              {isOutOfStock ? 'Out of stock' : `${product.stock} in stock`}
            </p>
          </div>
          
          {/* Button inline on larger screens */}
          {isClient && (
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || addToCart.isPending}
              className="hidden sm:flex px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-navy text-ivory hover:bg-navy-deep hover:shadow-lg items-center justify-center"
            >
              {addToCart.isPending ? (
                <LoadingSpinner size="sm" />
              ) : (
                <span className="whitespace-nowrap">Add to Cart</span>
              )}
            </button>
          )}
        </div>

        {/* Full-width button at bottom on mobile */}
        {isClient && (
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || addToCart.isPending}
            className="sm:hidden w-full py-2.5 rounded-lg font-medium text-xs transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-navy text-ivory hover:bg-navy-deep mt-auto flex items-center justify-center gap-1.5"
          >
            {addToCart.isPending ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
