import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatters'
import { Link } from 'react-router-dom'

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, subtotal, itemCount, total } = useCart()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-lift"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={22} className="text-brand-500" />
                <h2 className="font-display font-bold text-lg text-charcoal">Your Cart</h2>
                {itemCount > 0 && (
                  <span className="bg-brand-100 text-brand-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="h-20 w-20 bg-brand-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-brand-400" />
                  </div>
                  <h3 className="font-display font-bold text-charcoal mb-2">Your cart is empty</h3>
                  <p className="text-sm text-gray-500 mb-6">Looks like you haven't added anything yet</p>
                  <button onClick={() => setIsCartOpen(false)} className="btn-primary">
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.cartItemId}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-charcoal truncate">{item.name}</h4>
                        {item.size && (
                          <p className="text-xs text-gray-500 mt-0.5">Size: {item.size.name}</p>
                        )}
                        {item.extras.length > 0 && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            + {item.extras.map((e) => e.name).join(', ')}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-brand-500 text-sm">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-7 w-7 flex items-center justify-center rounded-lg border border-gray-200 hover:border-brand-500 transition-colors disabled:opacity-40"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="h-7 w-7 flex items-center justify-center rounded-lg border border-gray-200 hover:border-brand-500 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                            <button
                              onClick={() => removeItem(item.cartItemId)}
                              className="h-7 w-7 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 transition-colors ml-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="font-semibold text-charcoal">Total</span>
                  <span className="font-bold text-brand-500">{formatPrice(total)}</span>
                </div>
                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary w-full"
                >
                  View Full Cart
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-outline w-full"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
