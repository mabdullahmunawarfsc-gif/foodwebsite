import { motion } from 'framer-motion'
import DealCard from '../components/common/DealCard'
import SectionHeading from '../components/ui/SectionHeading'
import { deals } from '../data/deals'

export default function Deals() {
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
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">Deals & Offers</h1>
            <p className="text-white/80 text-lg">Save big with our exclusive combo deals</p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        <SectionHeading
          title="Today's Best Deals"
          subtitle="Limited time offers - grab them before they're gone"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, i) => (
            <DealCard key={deal.id} deal={deal} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
