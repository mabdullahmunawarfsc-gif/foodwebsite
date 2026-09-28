import { Minus, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

export default function QuantitySelector({ quantity, onUpdate, min = 1, max = 20, size = 'md' }) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  }

  return (
    <div className="flex items-center gap-1">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onUpdate(quantity - 1)}
        disabled={quantity <= min}
        className={`${sizes[size]} flex items-center justify-center rounded-lg border border-gray-200 hover:border-brand-500 hover:bg-brand-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Decrease quantity"
      >
        <Minus size={iconSizes[size]} />
      </motion.button>
      <span className="w-10 text-center font-semibold text-charcoal">{quantity}</span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onUpdate(quantity + 1)}
        disabled={quantity >= max}
        className={`${sizes[size]} flex items-center justify-center rounded-lg border border-gray-200 hover:border-brand-500 hover:bg-brand-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Increase quantity"
      >
        <Plus size={iconSizes[size]} />
      </motion.button>
    </div>
  )
}
