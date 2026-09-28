import { motion } from 'framer-motion'
import { BadgePercent, Clock, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatters'
import toast from 'react-hot-toast'

export default function DealCard({ deal, index = 0 }) {
  const { addItem } = useCart()

  const handleAddDeal = () => {
    // Add each item in the deal to cart
    deal.items.forEach((item) => {
      // Find matching product or add as custom item
      addItem({
        id: `deal-${deal.id}-${item}`,
        name: item,
        price: 0,
        image: deal.image,
        category: 'deals',
      })
    })
    toast.success(`"${deal.title}" added to cart!`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card group hover:shadow-lift transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={deal.image}
          alt={deal.title}
          loading="lazy"
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 bg-brand-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            <BadgePercent size={14} />
            {deal.discount}% OFF
          </div>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-gray-600">
          <Clock size={12} />
          <span>Limited Time</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-charcoal">{deal.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{deal.description}</p>
        <ul className="mt-3 space-y-1">
          {deal.items.map((item, i) => (
            <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-brand-400 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-400 line-through">{formatPrice(deal.originalPrice)}</span>
            <span className="ml-2 text-xl font-bold text-brand-500">{formatPrice(deal.dealPrice)}</span>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddDeal}
          className="mt-4 w-full btn-primary"
        >
          <ShoppingBag size={18} />
          Add Deal to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}
