import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Flame, Leaf } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatters'
import RatingStars from '../ui/RatingStars'
import Badge from '../ui/Badge'

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`} className="card group block hover:shadow-lift transition-shadow duration-300">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isVeg && (
              <Badge variant="success">
                <Leaf size={10} className="mr-1" /> Veg
              </Badge>
            )}
            {product.isSpicy && (
              <Badge variant="danger">
                <Flame size={10} className="mr-1" /> Spicy
              </Badge>
            )}
          </div>
          {product.isBestseller && (
            <div className="absolute top-3 right-3">
              <Badge variant="gold">Bestseller</Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-display font-bold text-charcoal group-hover:text-brand-500 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
          <div className="mt-2">
            <RatingStars rating={product.rating} reviews={product.reviews} />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-charcoal">{formatPrice(product.price)}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="h-10 w-10 bg-brand-500 text-white rounded-xl flex items-center justify-center hover:bg-brand-600 transition-colors shadow-soft"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus size={18} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
