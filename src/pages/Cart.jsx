import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowRight, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatters'
import { promoCodes } from '../data/promoCodes'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import EmptyState from '../components/ui/EmptyState'
import toast from 'react-hot-toast'

export default function Cart() {
  const {
    items, removeItem, updateQuantity, clearCart,
    subtotal, deliveryFee, tax, discount, total,
    promoCode, applyPromo, removePromo,
  } = useCart()

  const [promoInput, setPromoInput] = useState('')

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (!code) return
    if (promoCodes[code]) {
      applyPromo(code, promoCodes[code])
      setPromoInput('')
    } else {
      toast.error('Invalid promo code')
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen">
        <div className="container-custom py-16">
          <EmptyState
            title="Your cart is empty"
            description="Looks like you haven't added anything to your cart yet. Browse our menu and find something delicious!"
            action={
              <Link to="/menu" className="btn-primary">
                Browse Menu
                <ArrowRight size={18} />
              </Link>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-cream">
      <div className="container-custom py-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-display font-bold text-charcoal">Your Cart ({items.length} items)</h1>
              <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 font-medium">
                Clear All
              </button>
            </div>

            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.cartItemId}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-2xl p-4 shadow-soft flex gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-charcoal">{item.name}</h3>
                        {item.size && <p className="text-xs text-gray-500">Size: {item.size.name}</p>}
                        {item.extras.length > 0 && (
                          <p className="text-xs text-gray-400">+ {item.extras.map((e) => e.name).join(', ')}</p>
                        )}
                        {item.notes && <p className="text-xs text-gray-400 italic mt-1">Note: {item.notes}</p>}
                      </div>
                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 hover:border-brand-500 transition-colors disabled:opacity-40"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 hover:border-brand-500 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold text-brand-500">{formatPrice(item.unitPrice * item.quantity)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/menu" className="inline-flex items-center gap-2 text-brand-500 font-semibold hover:gap-3 transition-all mt-4">
              <ArrowLeft size={18} /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-soft sticky top-24">
              <h2 className="font-display font-bold text-xl text-charcoal mb-4">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2">
                  <Tag size={16} />
                  Promo Code
                </label>
                {promoCode ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                    <span className="text-sm font-semibold text-green-700">{promoCode}</span>
                    <button onClick={removePromo} className="text-xs text-red-500 font-medium">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Enter code"
                      className="input-field flex-1"
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                    />
                    <button onClick={handleApplyPromo} className="btn-secondary px-4">Apply</button>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-2">Try: WELCOME10, FOODIE20, FLAT100, FREEDEL</p>
              </div>

              {/* Totals */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-semibold">{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (5%)</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between text-base">
                  <span className="font-bold text-charcoal">Total</span>
                  <span className="font-bold text-brand-500 text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <Link to="/checkout" className="btn-primary w-full mt-6 text-lg">
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
