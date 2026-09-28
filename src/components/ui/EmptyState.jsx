import { motion } from 'framer-motion'
import { SearchX } from 'lucide-react'

export default function EmptyState({ title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="h-20 w-20 bg-brand-50 rounded-full flex items-center justify-center mb-4">
        <SearchX size={36} className="text-brand-400" />
      </div>
      <h3 className="text-lg font-display font-bold text-charcoal mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{description}</p>
      {action}
    </motion.div>
  )
}
