import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProducts } from '../hooks/useProducts';
import { productsApi } from '../api/products';
import { PageLoader, LoadingSpinner } from '../components/LoadingSpinner';
import type { Product, ProductCategory } from '../api/types';

export function AdminProducts() {
  const { data: products, isLoading, error } = useProducts();
  const queryClient = useQueryClient();
  
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState<ProductCategory>('AA');
  const [imageUrl, setImageUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Stock adjustment modal state
  const [stockModal, setStockModal] = useState<{ product: Product; type: 'increase' | 'decrease' } | null>(null);
  const [stockAmount, setStockAmount] = useState('1');
  const [stockError, setStockError] = useState('');

  const createProduct = useMutation({
    mutationFn: (data: Omit<Product, 'id'>) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setFormSuccess('Product created successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategory('AA');
      setImageUrl('');
      setTimeout(() => {
        setShowForm(false);
        setFormSuccess('');
      }, 2000);
    },
    onError: (error: unknown) => {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        const message = axiosError.response?.data?.message;
        if (message) {
          setFormError(message);
          return;
        }
      }
      setFormError('Failed to create product. Please try again.');
    },
  });

  const increaseStock = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      productsApi.increaseStock(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setStockModal(null);
      setStockAmount('1');
    },
    onError: (error: unknown) => {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        const message = axiosError.response?.data?.message;
        if (message) {
          setStockError(message);
          return;
        }
      }
      setStockError('Failed to update stock.');
    },
  });

  const decreaseStock = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      productsApi.decreaseStock(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setStockModal(null);
      setStockAmount('1');
    },
    onError: (error: unknown) => {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        const message = axiosError.response?.data?.message;
        if (message) {
          setStockError(message);
          return;
        }
      }
      setStockError('Failed to update stock.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!name || !price || !stock) {
      setFormError('Name, price, and stock are required.');
      return;
    }

    createProduct.mutate({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      imageUrl: imageUrl || undefined,
    });
  };

  const handleStockUpdate = () => {
    if (!stockModal) return;
    setStockError('');

    const quantity = parseInt(stockAmount);
    if (isNaN(quantity) || quantity <= 0) {
      setStockError('Please enter a valid quantity.');
      return;
    }

    if (stockModal.type === 'increase') {
      increaseStock.mutate({ productId: stockModal.product.id, quantity });
    } else {
      if (quantity > stockModal.product.stock) {
        setStockError(`Cannot decrease by ${quantity}. Only ${stockModal.product.stock} in stock.`);
        return;
      }
      decreaseStock.mutate({ productId: stockModal.product.id, quantity });
    }
  };

  if (isLoading) return <PageLoader />;

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😵</div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">
            Failed to load products
          </h2>
          <p className="text-graphite">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-ink mb-1 sm:mb-2">Manage Products</h1>
          <p className="text-graphite text-sm sm:text-base">{products?.length || 0} product(s) in catalog</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 sm:px-6 py-2 sm:py-3 font-medium text-ivory bg-burgundy rounded-xl hover:bg-wine hover:shadow-lg transition-all text-sm sm:text-base"
        >
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-cream border border-burgundy/20">
          <h2 className="font-display text-lg sm:text-xl font-bold text-ink mb-4 sm:mb-6">Add New Product</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="p-3 sm:p-4 rounded-xl bg-burgundy/10 border border-burgundy/20 text-burgundy text-sm">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="p-3 sm:p-4 rounded-xl bg-sage/10 border border-sage/30 text-sage text-sm">
                {formSuccess}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all text-sm sm:text-base"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all text-sm sm:text-base"
                  placeholder="Enter description"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Image URL <span className="text-graphite/50">(optional)</span>
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all text-sm sm:text-base"
                placeholder="https://example.com/image.jpg"
              />
              {imageUrl && (
                <div className="mt-2 flex items-center gap-3">
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="h-16 w-16 rounded-lg object-cover border border-stone"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <span className="text-xs text-graphite">Image preview</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all text-sm sm:text-base"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-ivory border border-stone text-ink placeholder:text-graphite/50 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-all text-sm sm:text-base"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Category *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['AAA', 'AA', 'A'] as ProductCategory[]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-2 sm:px-3 py-2 sm:py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                        category === cat
                          ? 'bg-burgundy/10 border-burgundy text-burgundy'
                          : 'bg-ivory border-stone text-graphite hover:border-burgundy/30'
                      }`}
                    >
                      {cat === 'AAA' ? '⭐' : cat === 'AA' ? '✨' : '📦'}
                      <span className="hidden sm:inline ml-1">
                        {cat === 'AAA' ? 'Premium' : cat === 'AA' ? 'Standard' : 'Basic'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={createProduct.isPending}
              className="w-full sm:w-auto px-6 py-3 font-medium text-ivory bg-burgundy rounded-xl hover:bg-wine hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {createProduct.isPending ? <LoadingSpinner size="sm" /> : 'Create Product'}
            </button>
          </form>
        </div>
      )}

      {/* Products - Cards on mobile, Table on desktop */}
      <div className="hidden lg:block rounded-2xl bg-cream border border-stone overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone bg-parchment">
              <th className="px-4 py-3 text-left text-sm font-medium text-graphite">Image</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-graphite">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-graphite">Category</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-graphite">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-graphite">Stock</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-graphite">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border-b border-stone/50 hover:bg-parchment/50">
                  <td className="px-4 py-3">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-parchment flex items-center justify-center text-xl">📦</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ink font-medium">{product.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.category === 'AAA' ? 'bg-gold/20 text-gold-muted' :
                      product.category === 'AA' ? 'bg-navy/10 text-navy' : 'bg-stone text-charcoal'
                    }`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-navy font-bold">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > 10 ? 'bg-sage/20 text-sage' :
                      product.stock > 0 ? 'bg-gold/20 text-gold-muted' : 'bg-burgundy/20 text-burgundy'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => { setStockModal({ product, type: 'increase' }); setStockAmount('1'); setStockError(''); }}
                        className="px-3 py-2 rounded-lg text-xs font-medium bg-sage/20 text-sage border border-sage/30 hover:bg-sage/30 transition-all flex items-center gap-1"
                      >
                        + Add
                      </button>
                      <button
                        onClick={() => { setStockModal({ product, type: 'decrease' }); setStockAmount('1'); setStockError(''); }}
                        disabled={product.stock === 0}
                        className="px-3 py-2 rounded-lg text-xs font-medium bg-burgundy/20 text-burgundy border border-burgundy/30 hover:bg-burgundy/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        − Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-graphite">
                  No products yet. Click "Add Product" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="rounded-2xl bg-cream border border-stone p-4">
              <div className="flex gap-4">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="h-20 w-20 rounded-xl object-cover shrink-0" />
                    ) : (
                      <div className="h-20 w-20 rounded-xl bg-parchment flex items-center justify-center text-3xl shrink-0">📦</div>
                    )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-ink truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      product.category === 'AAA' ? 'bg-gold/20 text-gold-muted' :
                      product.category === 'AA' ? 'bg-navy/10 text-navy' : 'bg-stone text-charcoal'
                    }`}>
                      {product.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      product.stock > 10 ? 'bg-sage/20 text-sage' :
                      product.stock > 0 ? 'bg-gold/20 text-gold-muted' : 'bg-burgundy/20 text-burgundy'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </div>
                  <p className="text-navy font-bold text-lg mt-2">${product.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => { setStockModal({ product, type: 'increase' }); setStockAmount('1'); setStockError(''); }}
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-sage/20 text-sage border border-sage/30"
                >
                  + Add Stock
                </button>
                <button
                  onClick={() => { setStockModal({ product, type: 'decrease' }); setStockAmount('1'); setStockError(''); }}
                  disabled={product.stock === 0}
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-medium bg-burgundy/20 text-burgundy border border-burgundy/30 disabled:opacity-50"
                >
                  − Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-graphite">
            No products yet. Click "Add Product" to create one.
          </div>
        )}
      </div>

      {/* Stock Adjustment Modal */}
      {stockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm">
          <div className="bg-ivory rounded-2xl border border-stone p-4 sm:p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="font-display text-lg sm:text-xl font-bold text-ink">
                {stockModal.type === 'increase' ? '📦 Add Stock' : '📤 Remove Stock'}
              </h3>
              <button onClick={() => setStockModal(null)} className="text-graphite hover:text-ink transition-colors p-1">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <div className="p-3 sm:p-4 rounded-xl bg-cream border border-stone mb-4">
                <p className="text-ink font-medium">{stockModal.product.name}</p>
                <p className="text-graphite text-sm">
                  Current stock: <span className="text-navy font-bold">{stockModal.product.stock} units</span>
                </p>
              </div>

              {stockError && (
                <div className="p-3 rounded-xl bg-burgundy/10 border border-burgundy/20 text-burgundy text-sm mb-4">
                  {stockError}
                </div>
              )}

              <label className="block text-sm font-medium text-charcoal mb-2">
                Quantity to {stockModal.type === 'increase' ? 'add' : 'remove'}
              </label>
              <input
                type="number"
                min="1"
                max={stockModal.type === 'decrease' ? stockModal.product.stock : undefined}
                value={stockAmount}
                onChange={(e) => setStockAmount(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-cream border border-stone text-ink focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all"
                placeholder="Enter quantity"
              />
              <p className="text-graphite text-sm mt-2">
                New stock will be:{' '}
                <span className={stockModal.type === 'increase' ? 'text-sage font-bold' : 'text-burgundy font-bold'}>
                  {stockModal.type === 'increase'
                    ? stockModal.product.stock + (parseInt(stockAmount) || 0)
                    : Math.max(0, stockModal.product.stock - (parseInt(stockAmount) || 0))} units
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStockModal(null)}
                className="flex-1 px-4 py-3 rounded-xl font-medium text-ink border border-stone hover:bg-cream transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleStockUpdate}
                disabled={increaseStock.isPending || decreaseStock.isPending}
                className={`flex-1 px-4 py-3 rounded-xl font-medium text-ivory transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${
                  stockModal.type === 'increase' ? 'bg-sage hover:bg-sage/90' : 'bg-burgundy hover:bg-wine'
                }`}
              >
                {(increaseStock.isPending || decreaseStock.isPending) ? (
                  <LoadingSpinner size="sm" />
                ) : stockModal.type === 'increase' ? 'Add Stock' : 'Remove Stock'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
