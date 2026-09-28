import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Leaf, Flame } from 'lucide-react'
import ProductCard from '../components/common/ProductCard'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import EmptyState from '../components/ui/EmptyState'
import { products } from '../data/products'
import { categories } from '../data/categories'
import { useDebounce } from '../hooks/useDebounce'

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [isLoading, setIsLoading] = useState(true)
  const debouncedSearch = useDebounce(search, 300)

  const activeCategory = searchParams.get('category') || 'all'

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory)
    }

    // Search filter
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
      default:
        result.sort((a, b) => b.reviews - a.reviews)
        break
    }

    return result
  }, [activeCategory, debouncedSearch, sortBy])

  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', catId)
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="pt-20 md:pt-24">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-brand-500 to-brand-600 py-12 md:py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">Our Menu</h1>
            <p className="text-white/80 text-lg">Explore our delicious range of food</p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Search & Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-11"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field w-auto"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-brand-500 text-white shadow-soft'
                  : 'bg-white text-charcoal hover:bg-brand-50 border border-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-charcoal">{filteredProducts.length}</span> items
          </p>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <Leaf size={10} /> Veg
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
              <Flame size={10} /> Spicy
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SkeletonLoader type="card" count={8} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            title="No items found"
            description="Try adjusting your search or filter to find what you're looking for."
            action={
              <button
                onClick={() => {
                  setSearch('')
                  handleCategoryChange('all')
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
