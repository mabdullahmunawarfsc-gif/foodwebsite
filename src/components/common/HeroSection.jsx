import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Truck, Clock } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-cream via-white to-brand-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 h-72 w-72 bg-brand-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 bg-gold-400 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-charcoal leading-tight"
            >
              Delicious Food,
              <br />
              <span className="text-brand-500">Delivered Fast</span>
              <br />
              To Your Door
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-gray-500 max-w-lg mx-auto lg:mx-0"
            >
              From sizzling burgers to cheesy pizzas, order your favorites from the comfort of your home. Hot, fresh, and at your doorstep in 30 minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/menu" className="btn-primary text-lg px-8 py-4">
                Order Now
                <ArrowRight size={20} />
              </Link>
              <Link to="/deals" className="btn-outline text-lg px-8 py-4">
                View Deals
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex gap-8 justify-center lg:justify-start"
            >
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-1 justify-center lg:justify-start">
                  <Truck size={18} className="text-brand-500" />
                  <span className="font-display font-bold text-2xl text-charcoal">30min</span>
                </div>
                <span className="text-sm text-gray-500">Avg Delivery</span>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-1 justify-center lg:justify-start">
                  <Star size={18} className="text-gold-400 fill-gold-400" />
                  <span className="font-display font-bold text-2xl text-charcoal">4.8</span>
                </div>
                <span className="text-sm text-gray-500">Customer Rating</span>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-1 justify-center lg:justify-start">
                  <Clock size={18} className="text-brand-500" />
                  <span className="font-display font-bold text-2xl text-charcoal">11AM-12AM</span>
                </div>
                <span className="text-sm text-gray-500">Open Daily</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80"
                alt="Delicious food spread"
                className="rounded-3xl shadow-lift w-full object-cover"
              />
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-8 top-8 bg-white rounded-2xl shadow-lift p-4 flex items-center gap-3"
              >
                <div className="h-12 w-12 bg-brand-100 rounded-xl flex items-center justify-center">
                  <Truck size={24} className="text-brand-500" />
                </div>
                <div>
                  <p className="font-bold text-charcoal text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-500">On orders above Rs. 1000</p>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -right-4 bottom-16 bg-white rounded-2xl shadow-lift p-4 flex items-center gap-3"
              >
                <div className="h-12 w-12 bg-gold-400/20 rounded-xl flex items-center justify-center">
                  <Star size={24} className="text-gold-500 fill-gold-500" />
                </div>
                <div>
                  <p className="font-bold text-charcoal text-sm">4.8 Rating</p>
                  <p className="text-xs text-gray-500">10,000+ Reviews</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
