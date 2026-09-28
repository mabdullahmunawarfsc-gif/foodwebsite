import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('foodhub_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  const login = (userData) => {
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      addresses: [],
      orders: [],
      favorites: [],
    }
    setUser(newUser)
    localStorage.setItem('foodhub_user', JSON.stringify(newUser))
    return newUser
  }

  const signup = (userData) => {
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      addresses: [],
      orders: [],
      favorites: [],
    }
    setUser(newUser)
    localStorage.setItem('foodhub_user', JSON.stringify(newUser))
    return newUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('foodhub_user')
  }

  const updateUser = (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem('foodhub_user', JSON.stringify(updated))
  }

  const addAddress = (address) => {
    const addresses = [...(user?.addresses || []), { id: Date.now(), ...address }]
    updateUser({ addresses })
  }

  const addOrder = (order) => {
    const orders = [...(user?.orders || []), order]
    updateUser({ orders })
  }

  const toggleFavorite = (productId) => {
    const favorites = user?.favorites || []
    const updated = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId]
    updateUser({ favorites: updated })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        addAddress,
        addOrder,
        toggleFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
