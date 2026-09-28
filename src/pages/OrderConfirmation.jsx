import { useParams, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, ChefHat, Truck, MapPin, Phone, Clock } from 'lucide-react'
import { formatPrice } from '../utils/formatters'
import Breadcrumbs from '../components/ui/Breadcrumbs'

const steps = [
  { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, description: 'Your order has been received' },
  { id: 'preparing', label: 'Preparing', icon: ChefHat, description: 'Your food is being prepared' },
  { id: 'delivery', label: 'Out for Delivery', icon: Truck, description: 'Your order is on the way' },
  { id: 'delivered', label: 'Delivered', icon: MapPin, description: 'Enjoy your meal!' },
]

export default function OrderConfirmation() {
  const { orderNumber } = useParams()
  const location = useLocation()
  const order = location.state?.order

  // Simulate current step based on time elapsed
  const getCurrentStep = () => {
    if (!order) return 0
    const elapsed = Date.now() - new Date(order.createdAt).getTime()
    if (elapsed < 30000) return 0
    if (elapsed < 60000) return 1
    if (elapsed < 120000) return 2
    return 3
  }

  const currentStep = getCurrentStep()

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-cream">
      <div className="container-custom py-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Order Confirmation' }]} />

        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 10 }}
              className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle size={48} className="text-green-500" />
            </motion.div>
            <h1 className="text-3xl font-display font-bold text-charcoal mb-2">Order Confirmed!</h1>
            <p className="text-gray-500">Order #{orderNumber}</p>
          </motion.div>

          {/* Tracking Stepper */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft mb-6">
            <h2 className="font-display font-bold text-xl text-charcoal mb-6">Order Tracking</h2>
            <div className="relative">
              {steps.map((step, i) => {
                const isActive = i <= currentStep
                const isCurrent = i === currentStep
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-4 mb-6 last:mb-0"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${
                          isActive ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-400'
                        } ${isCurrent ? 'ring-4 ring-brand-500/20' : ''}`}
                      >
                        <step.icon size={22} />
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`h-12 w-0.5 mt-2 ${i < currentStep ? 'bg-brand-500' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="pt-2">
                      <h3 className={`font-semibold ${isActive ? 'text-charcoal' : 'text-gray-400'}`}>
                        {step.label}
                      </h3>
                      <p className="text-sm text-gray-500">{step.description}</p>
                      {isCurrent && (
                        <span className="inline-block mt-1 text-xs font-semibold text-brand-500 bg-brand-50 px-2 py-0.5 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Order Details */}
          {order && (
            <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
              <h2 className="font-display font-bold text-xl text-charcoal mb-4">Order Details</h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.cartItemId} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name}
                      {item.size && ` (${item.size.name})`}
                    </span>
                    <span className="font-semibold">{formatPrice(item.unitPrice * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery</span>
                    <span>{order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span>{formatPrice(order.tax)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(order.discount)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-brand-500">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Estimated Time */}
          <div className="bg-brand-50 rounded-2xl p-6 text-center mb-6">
            <Clock size={32} className="text-brand-500 mx-auto mb-2" />
            <h3 className="font-display font-bold text-charcoal">Estimated Delivery Time</h3>
            <p className="text-2xl font-bold text-brand-500 mt-1">30-45 minutes</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/menu" className="btn-primary flex-1">
              Order More
            </Link>
            <Link to="/" className="btn-outline flex-1">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
