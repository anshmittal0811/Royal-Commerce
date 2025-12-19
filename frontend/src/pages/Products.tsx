import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { PageLoader } from '../components/LoadingSpinner';

export function Products() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <PageLoader />;

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😵</div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">
            Failed to load products
          </h2>
          <p className="text-graphite text-sm sm:text-base">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8 sm:mb-12">
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-ink mb-1 sm:mb-2">Products</h1>
        <p className="text-graphite text-sm sm:text-base">Discover our amazing collection</p>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 sm:py-20">
          <div className="text-5xl sm:text-6xl mb-4">📦</div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">No products yet</h2>
          <p className="text-graphite text-sm sm:text-base">Check back later for new arrivals</p>
        </div>
      )}
    </div>
  );
}
