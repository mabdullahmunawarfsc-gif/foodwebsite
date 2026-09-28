import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import { branches } from '../data/branches'
import Breadcrumbs from '../components/ui/Breadcrumbs'

export default function Branches() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-cream">
      <div className="container-custom py-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Our Branches' }]} />

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-charcoal mb-3">Find a Branch</h1>
          <p className="text-gray-500 text-lg">Visit us at any of our locations across Pakistan</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch, i) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lift transition-shadow"
            >
              <img src={branch.image} alt={branch.name} className="h-48 w-full object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-charcoal mb-3">{branch.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin size={16} className="mt-0.5 text-brand-500 flex-shrink-0" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} className="text-brand-500 flex-shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} className="text-brand-500 flex-shrink-0" />
                    <span>{branch.hours}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="btn-primary flex-1 text-sm py-2">
                    <Navigation size={14} />
                    Get Directions
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
