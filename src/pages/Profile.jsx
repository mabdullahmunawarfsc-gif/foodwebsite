import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, MapPin, Package, Heart, LogOut, Plus, Edit2, Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { formatPrice, formatDate } from '../utils/formatters'
import Input from '../components/ui/Input'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user, logout, addAddress } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState({ label: '', address: '', city: '', phone: '' })

  if (!user) {
    navigate('/login')
    return null
  }

  const handleAddAddress = (e) => {
    e.preventDefault()
    if (!newAddress.label || !newAddress.address) {
      toast.error('Please fill in all required fields')
      return
    }
    addAddress(newAddress)
    setNewAddress({ label: '', address: '', city: '', phone: '' })
    setShowAddressForm(false)
    toast.success('Address added successfully')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'favorites', label: 'Favorites', icon: Heart },
  ]

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-cream">
      <div className="container-custom py-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'My Account' }]} />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="text-center mb-6">
                <div className="h-20 w-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User size={36} className="text-brand-500" />
                </div>
                <h2 className="font-display font-bold text-lg text-charcoal">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-brand-50 text-brand-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={() => { logout(); navigate('/'); toast.success('Logged out successfully') }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="font-display font-bold text-xl text-charcoal mb-6">Profile Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Full Name" value={user.name} readOnly />
                  <Input label="Email" value={user.email} readOnly />
                  <Input label="Phone" value={user.phone || 'Not added'} readOnly />
                  <Input label="Member Since" value={formatDate(user.id)} readOnly />
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="font-display font-bold text-xl text-charcoal mb-6">Order History</h2>
                {user.orders?.length > 0 ? (
                  <div className="space-y-4">
                    {user.orders.map((order) => (
                      <div key={order.id} className="border border-gray-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-charcoal">Order #{order.id}</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-sm text-gray-600">{order.items.length} items</span>
                          <span className="font-bold text-brand-500">{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No orders yet</p>
                    <Link to="/menu" className="btn-primary mt-4 inline-flex">Start Ordering</Link>
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-xl text-charcoal">Saved Addresses</h2>
                  <button onClick={() => setShowAddressForm(!showAddressForm)} className="btn-primary text-sm">
                    <Plus size={16} /> Add New
                  </button>
                </div>
                {showAddressForm && (
                  <form onSubmit={handleAddAddress} className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input label="Label" placeholder="e.g., Home, Office" value={newAddress.label} onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })} required />
                      <Input label="Phone" placeholder="03XX-XXXXXXX" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} />
                    </div>
                    <Input label="Address" placeholder="Full address" value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} required />
                    <Input label="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
                    <div className="flex gap-2">
                      <button type="submit" className="btn-primary text-sm">Save Address</button>
                      <button type="button" onClick={() => setShowAddressForm(false)} className="btn-outline text-sm">Cancel</button>
                    </div>
                  </form>
                )}
                {user.addresses?.length > 0 ? (
                  <div className="space-y-3">
                    {user.addresses.map((addr) => (
                      <div key={addr.id} className="border border-gray-100 rounded-xl p-4 flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-charcoal">{addr.label}</p>
                          <p className="text-sm text-gray-500">{addr.address}, {addr.city}</p>
                          {addr.phone && <p className="text-sm text-gray-500">{addr.phone}</p>}
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-brand-500"><Edit2 size={16} /></button>
                          <button className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No saved addresses</p>
                )}
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="font-display font-bold text-xl text-charcoal mb-6">My Favorites</h2>
                {user.favorites?.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {user.favorites.map((fav) => (
                      <div key={fav} className="border border-gray-100 rounded-xl p-4">
                        <p className="font-semibold text-charcoal">Item #{fav}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No favorites yet</p>
                    <Link to="/menu" className="btn-primary mt-4 inline-flex">Browse Menu</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
