import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Pizza } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-cream flex items-center justify-center">
      <div className="container-custom text-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <div className="text-8xl md:text-9xl font-display font-black text-brand-500 mb-4">404</div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Pizza size={48} className="text-brand-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-3">Oops! Page Not Found</h1>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Looks like this page got eaten up! The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">
              <Home size={18} />
              Go Home
            </Link>
            <button onClick={() => window.history.back()} className="btn-outline">
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
