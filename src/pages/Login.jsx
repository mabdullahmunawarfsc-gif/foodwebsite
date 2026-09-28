import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { validateEmail, validatePhone, validateRequired } from '../utils/validators'
import Input from '../components/ui/Input'
import toast from 'react-hot-toast'

export default function Login() {
  const navigate = useNavigate()
  const { login, signup } = useAuth()
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })

  const handleLogin = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!validateEmail(loginForm.email)) newErrors.email = 'Valid email required'
    if (!validateRequired(loginForm.password)) newErrors.password = 'Password required'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    login({ name: loginForm.email.split('@')[0], email: loginForm.email })
    setIsLoading(false)
    toast.success('Welcome back!')
    navigate('/')
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!validateRequired(signupForm.name)) newErrors.name = 'Name required'
    if (!validateEmail(signupForm.email)) newErrors.email = 'Valid email required'
    if (!validatePhone(signupForm.phone)) newErrors.phone = 'Valid phone required'
    if (signupForm.password.length < 6) newErrors.password = 'Min 6 characters'
    if (signupForm.password !== signupForm.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    signup(signupForm)
    setIsLoading(false)
    toast.success('Account created successfully!')
    navigate('/')
  }

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-cream flex items-center justify-center py-12">
      <div className="container-custom max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lift p-8"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="h-12 w-12 bg-brand-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">F</span>
              </div>
              <span className="font-display font-bold text-2xl text-charcoal">
                Food<span className="text-brand-500">Hub</span>
              </span>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setActiveTab('login'); setErrors({}) }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'login' ? 'bg-white text-charcoal shadow-soft' : 'text-gray-500'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setErrors({}) }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'signup' ? 'bg-white text-charcoal shadow-soft' : 'text-gray-500'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className={`input-field pl-11 ${errors.email ? 'border-red-400' : ''}`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className={`input-field pl-11 pr-11 ${errors.password ? 'border-red-400' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>
              <div className="flex justify-end">
                <a href="#" className="text-sm text-brand-500 hover:text-brand-600">Forgot password?</a>
              </div>
              <button type="submit" disabled={isLoading} className="btn-primary w-full">
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  className={`input-field pl-11 ${errors.name ? 'border-red-400' : ''}`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className={`input-field pl-11 ${errors.email ? 'border-red-400' : ''}`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Phone number (03XX-XXXXXXX)"
                  value={signupForm.phone}
                  onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                  className={`input-field pl-11 ${errors.phone ? 'border-red-400' : ''}`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password (min 6 characters)"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  className={`input-field pl-11 ${errors.password ? 'border-red-400' : ''}`}
                />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                  className={`input-field pl-11 ${errors.confirmPassword ? 'border-red-400' : ''}`}
                />
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>
              <button type="submit" disabled={isLoading} className="btn-primary w-full">
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-lg">🔵</span>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-lg">🔵</span>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
