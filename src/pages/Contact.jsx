import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import Input from '../components/ui/Input'
import SectionHeading from '../components/ui/SectionHeading'
import { validateEmail, validateRequired } from '../utils/validators'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!validateRequired(form.name)) newErrors.name = 'Name required'
    if (!validateEmail(form.email)) newErrors.email = 'Valid email required'
    if (!validateRequired(form.subject)) newErrors.subject = 'Subject required'
    if (!validateRequired(form.message)) newErrors.message = 'Message required'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setForm({ name: '', email: '', subject: '', message: '' })
    toast.success('Message sent successfully! We will get back to you soon.')
  }

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-600 py-12 md:py-16">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">Contact Us</h1>
            <p className="text-white/80 text-lg">We would love to hear from you</p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-display font-bold text-lg text-charcoal mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-brand-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-charcoal">Address</p>
                    <p className="text-sm text-gray-500">Main Boulevard, Gulberg III, Lahore</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-brand-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-charcoal">Phone</p>
                    <p className="text-sm text-gray-500">+92 42 3577 1234</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-brand-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-charcoal">Email</p>
                    <p className="text-sm text-gray-500">hello@foodhub.pk</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-brand-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-charcoal">Hours</p>
                    <p className="text-sm text-gray-500">11:00 AM - 12:00 AM (Mon-Sun)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Map View</p>
                <p className="text-gray-400 text-xs">Gulberg III, Lahore</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft">
              <SectionHeading title="Send us a Message" subtitle="Fill out the form below and we will get back to you within 24 hours" centered={false} />
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    error={errors.email}
                    required
                  />
                </div>
                <Input
                  label="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  error={errors.subject}
                  required
                />
                <div>
                  <label className="text-sm font-medium text-charcoal mb-1 block">
                    Message <span className="text-brand-500">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`input-field h-32 resize-none ${errors.message ? 'border-red-400' : ''}`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary">
                  <Send size={18} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
