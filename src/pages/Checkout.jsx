import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, CreditCard, Banknote, Smartphone, Truck, Store, ArrowLeft, Shield } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice, generateOrderNumber } from '../utils/formatters'
import { validateEmail, validatePhone, validateRequired } from '../utils/validators'
import Input from '../components/ui/Input'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import toast from 'react-hot-toast'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, deliveryFee, tax, discount, total, clearCart } = useCart()
  const { isAuthenticated, user, addOrder } = useAuth()

  const [orderType, setOrderType] = useState('delivery')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: 'Lahore',
    area: '',
    landmark: '',
    notes: '',
  })

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!validateRequired(form.name)) newErrors.name = 'Name is required'
    if (!validatePhone(form.phone)) newErrors.phone = 'Valid phone number required'
    if (!validateEmail(form.email)) newErrors.email = 'Valid email required'
    if (orderType === 'delivery') {
      if (!validateRequired(form.address)) newErrors.address = 'Address is required'
      if (!validateRequired(form.area)) newErrors.area = 'Area is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fix the errors in the form')
      return
    }

    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderNumber = generateOrderNumber()
    const order = {
      id: orderNumber,
      items,
      subtotal,
      deliveryFee: orderType === 'delivery' ? deliveryFee : 0,
      tax,
      discount,
      total,
      orderType,
      paymentMethod,
      address: orderType === 'delivery' ? form : null,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }

    if (isAuthenticated) {
      addOrder(order)
    }

    clearCart()
    setIsProcessing(false)
    navigate(`/order-confirmation/${orderNumber}`, { state: { order } })
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const paymentMethods = [
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when your order arrives' },
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, desc: 'Visa, Mastercard accepted' },
    { id: 'jazzcash', label: 'JazzCash', icon: Smartphone, desc: 'Mobile wallet payment' },
    { id: 'easypaisa', label: 'Easypaisa', icon: Smartphone, desc: 'Mobile wallet payment' },
  ]

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-cream">
      <div className="container-custom py-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Type */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="font-display font-bold text-xl text-charcoal mb-4">Order Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      orderType === 'delivery' ? 'border-brand-500 bg-brand-50' : 'border-gray-200'
                    }`}
                  >
                    <Truck size={24} className={orderType === 'delivery' ? 'text-brand-500' : 'text-gray-400'} />
                    <div className="text-left">
                      <p className="font-semibold text-charcoal">Delivery</p>
                      <p className="text-xs text-gray-500">30-45 min</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      orderType === 'pickup' ? 'border-brand-500 bg-brand-50' : 'border-gray-200'
                    }`}
                  >
                    <Store size={24} className={orderType === 'pickup' ? 'text-brand-500' : 'text-gray-400'} />
                    <div className="text-left">
                      <p className="font-semibold text-charcoal">Pickup</p>
                      <p className="text-xs text-gray-500">15-20 min</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Contact & Address */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="font-display font-bold text-xl text-charcoal mb-4">
                  {orderType === 'delivery' ? 'Delivery Address' : 'Contact Information'}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    error={errors.phone}
                    placeholder="03XX-XXXXXXX"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={errors.email}
                    required
                  />
                  {orderType === 'delivery' && (
                    <>
                      <Input
                        label="City"
                        value={form.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        required
                      />
                      <Input
                        label="Area / Sector"
                        value={form.area}
                        onChange={(e) => handleChange('area', e.target.value)}
                        error={errors.area}
                        placeholder="e.g., Gulberg III"
                        required
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Full Address"
                          value={form.address}
                          onChange={(e) => handleChange('address', e.target.value)}
                          error={errors.address}
                          placeholder="House #, Street #, Block"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          label="Landmark (Optional)"
                          value={form.landmark}
                          onChange={(e) => handleChange('landmark', e.target.value)}
                          placeholder="e.g., Near Liberty Market"
                        />
                      </div>
                    </>
                  )}
                  <div className="md:col-span-2">
                    <Input
                      label="Order Notes (Optional)"
                      value={form.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="font-display font-bold text-xl text-charcoal mb-4">Payment Method</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        paymentMethod === method.id ? 'border-brand-500 bg-brand-50' : 'border-gray-200'
                      }`}
                    >
                      <method.icon size={24} className={paymentMethod === method.id ? 'text-brand-500' : 'text-gray-400'} />
                      <div>
                        <p className="font-semibold text-charcoal">{method.label}</p>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary w-full text-lg py-4"
              >
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <Shield size={20} />
                    Place Order - {formatPrice(total)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-soft sticky top-24">
              <h2 className="font-display font-bold text-xl text-charcoal mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate mr-2">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-semibold flex-shrink-0">{formatPrice(item.unitPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-semibold">
                    {orderType === 'pickup' ? 'FREE' : deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
