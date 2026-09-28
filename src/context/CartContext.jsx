import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [promoCode, setPromoCode] = useState(null)
  const [discount, setDiscount] = useState(0)

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('foodhub_cart')
    if (stored) {
      setItems(JSON.parse(stored))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('foodhub_cart', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product, options = {}) => {
    const { size, extras = [], quantity = 1, notes = '' } = options
    const cartItemId = `${product.id}-${size?.name || 'default'}-${extras.map((e) => e.name).join(',')}`
    
    setItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId)
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          image: product.image,
          basePrice: product.price,
          size,
          extras,
          quantity,
          notes,
          unitPrice: (size?.price || product.price) + extras.reduce((sum, e) => sum + e.price, 0),
        },
      ]
    })
    toast.success(`${product.name} added to cart!`)
  }, [])

  const removeItem = useCallback((cartItemId) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId))
    toast.success('Item removed from cart')
  }, [])

  const updateQuantity = useCallback((cartItemId, newQuantity) => {
    if (newQuantity < 1) return
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setPromoCode(null)
    setDiscount(0)
  }, [])

  const applyPromo = useCallback((code, promoData) => {
    setPromoCode(code)
    if (promoData.type === 'percentage') {
      setDiscount(promoData.discount)
    } else if (promoData.type === 'flat') {
      setDiscount(promoData.discount)
    } else if (promoData.type === 'freeDelivery') {
      setDiscount(0)
    }
    toast.success(`Promo code "${code}" applied!`)
  }, [])

  const removePromo = useCallback(() => {
    setPromoCode(null)
    setDiscount(0)
    toast.success('Promo code removed')
  }, [])

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const deliveryFee = subtotal > 0 ? (promoCode === 'FREEDEL' ? 0 : 150) : 0
  const tax = Math.round(subtotal * 0.05)
  const discountAmount = promoCode
    ? discount > 0 && discount < 100
      ? Math.round((subtotal * discount) / 100)
      : discount >= 100
      ? Math.min(discount, subtotal)
      : 0
    : 0
  const total = subtotal + deliveryFee + tax - discountAmount
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryFee,
        tax,
        discount: discountAmount,
        total,
        itemCount,
        promoCode,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
