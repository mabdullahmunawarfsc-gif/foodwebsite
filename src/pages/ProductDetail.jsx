import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingCart, Heart, Leaf, Flame, ChevronRight, MessageSquare } from 'lucide-react'
import { getProductById, getRelatedProducts } from '../data/products'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../utils/formatters'
import RatingStars from '../components/ui/RatingStars'
import Badge from '../components/ui/Badge'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import ProductCard from '../components/common/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import toast from 'react-hot-toast'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addItem } = useCart()
  const { isAuthenticated, toggleFavorite, user } = useAuth()

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null)
  const [selectedExtras, setSelectedExtras] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')

  const relatedProducts = useMemo(() => (product ? getRelatedProducts(product) : []), [product])

  if (!product) {
    return (
      <div className="pt-24 pb-16 text-center">
        <h2 className="text-2xl font-display font-bold text-charcoal">Product not found</h2>
        <Link to="/menu" className="btn-primary mt-4 inline-flex">Back to Menu</Link>
      </div>
    )
  }

  const isFavorite = user?.favorites?.includes(product.id)

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.name === extra.name)
        ? prev.filter((e) => e.name !== extra.name)
        : [...prev, extra]
    )
  }

  const totalPrice = (selectedSize?.price || product.price) + selectedExtras.reduce((sum, e) => sum + e.price, 0)

  const handleAddToCart = () => {
    addItem(product, {
      size: selectedSize,
      extras: selectedExtras,
      quantity,
      notes,
    })
  }

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-custom py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Menu', to: '/menu' },
            { label: product.name },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 md:h-96 object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {product.isVeg && <Badge variant="success"><Leaf size={10} className="mr-1" /> Veg</Badge>}
                {product.isSpicy && <Badge variant="danger"><Flame size={10} className="mr-1" /> Spicy</Badge>}
              </div>
              {product.isBestseller && (
                <div className="absolute top-4 right-4">
                  <Badge variant="gold">Bestseller</Badge>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal">{product.name}</h1>
              <div className="mt-2 flex items-center gap-3">
                <RatingStars rating={product.rating} showValue reviews={product.reviews} />
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-display font-bold text-charcoal mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-3 rounded-xl border-2 font-medium transition-all ${
                        selectedSize?.name === size.name
                          ? 'border-brand-500 bg-brand-50 text-brand-600'
                          : 'border-gray-200 hover:border-brand-300'
                      }`}
                    >
                      <span className="block text-sm">{size.name}</span>
                      <span className="block text-xs text-gray-500">{formatPrice(size.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Extras */}
            {product.extras && product.extras.length > 0 && (
              <div>
                <h3 className="font-display font-bold text-charcoal mb-3">Add Extras</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.extras.map((extra) => {
                    const isSelected = selectedExtras.find((e) => e.name === extra.name)
                    return (
                      <button
                        key={extra.name}
                        onClick={() => toggleExtra(extra)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-brand-500 bg-brand-50'
                            : 'border-gray-200 hover:border-brand-300'
                        }`}
                      >
                        <span className="text-sm font-medium">{extra.name}</span>
                        <span className="text-sm text-brand-500 font-semibold">+{formatPrice(extra.price)}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(20, quantity + 1))}
                  className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="btn-primary flex-1 text-lg"
              >
                <ShoppingCart size={20} />
                Add to Cart - {formatPrice(totalPrice * quantity)}
              </motion.button>
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    toast.error('Please login to save favorites')
                    return
                  }
                  toggleFavorite(product.id)
                }}
                className={`h-14 w-14 rounded-xl border-2 flex items-center justify-center transition-all ${
                  isFavorite
                    ? 'border-red-400 bg-red-50 text-red-500'
                    : 'border-gray-200 hover:border-red-300 text-gray-400'
                }`}
                aria-label="Add to favorites"
              >
                <Heart size={22} className={isFavorite ? 'fill-red-500' : ''} />
              </button>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2">
                <MessageSquare size={16} />
                Special Instructions
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests? e.g., less spicy, no onions..."
                className="input-field h-24 resize-none"
              />
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <SectionHeading title="You Might Also Like" subtitle="Similar items you may enjoy" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
