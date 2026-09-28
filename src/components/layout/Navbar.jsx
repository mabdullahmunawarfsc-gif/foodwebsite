import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, User, Search, Menu, X, Heart, MapPin } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { itemCount, setIsCartOpen } = useCart()
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/deals', label: 'Deals' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 bg-brand-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">F</span>
            </div>
            <span className={`font-display font-bold text-xl ${isScrolled ? 'text-charcoal' : 'text-charcoal'}`}>
              Food<span className="text-brand-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-brand-500 ${
                  location.pathname === link.to ? 'text-brand-500' : 'text-charcoal'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/menu"
              className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-brand-500 transition-colors"
            >
              <Search size={18} />
            </Link>

            <Link
              to="/branches"
              className="hidden lg:flex items-center gap-1 text-sm text-gray-500 hover:text-brand-500 transition-colors"
            >
              <MapPin size={16} />
              <span>Branches</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-brand-50 rounded-xl transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} className="text-charcoal" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 bg-brand-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            <Link
              to={isAuthenticated ? '/profile' : '/login'}
              className="hidden md:flex items-center gap-2 text-sm font-medium text-charcoal hover:text-brand-500 transition-colors"
            >
              <User size={18} />
              <span>{isAuthenticated ? user?.name?.split(' ')[0] : 'Login'}</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-brand-50 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-brand-50 text-brand-500'
                      : 'text-charcoal hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/branches"
                className="px-4 py-3 rounded-xl text-sm font-medium text-charcoal hover:bg-gray-50 transition-colors"
              >
                Branches
              </Link>
              <Link
                to={isAuthenticated ? '/profile' : '/login'}
                className="px-4 py-3 rounded-xl text-sm font-medium text-brand-500 hover:bg-brand-50 transition-colors"
              >
                {isAuthenticated ? `Hi, ${user?.name?.split(' ')[0]}` : 'Login / Signup'}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
