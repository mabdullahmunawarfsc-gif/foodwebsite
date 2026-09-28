import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 bg-brand-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">F</span>
              </div>
              <span className="font-display font-bold text-xl">
                Food<span className="text-brand-500">Hub</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Delicious food delivered hot and fast to your doorstep. From pizzas to burgers, we have something for everyone.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-brand-500 transition-colors"
                  aria-label="Social media link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/menu', label: 'Our Menu' },
                { to: '/deals', label: 'Deals & Offers' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/branches', label: 'Find a Branch' },
                { to: '/faq', label: 'FAQ' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 text-sm hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-brand-400" />
                <span>Main Boulevard, Gulberg III, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={16} className="flex-shrink-0 text-brand-400" />
                <span>+92 42 3577 1234</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="flex-shrink-0 text-brand-400" />
                <span>hello@foodhub.pk</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Clock size={16} className="flex-shrink-0 text-brand-400" />
                <span>11:00 AM - 12:00 AM (Mon-Sun)</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get exclusive deals and new menu updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-white/10 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-brand-500/50"
              />
              <button className="px-4 py-3 bg-brand-500 rounded-xl text-sm font-semibold hover:bg-brand-600 transition-colors">
                Join
              </button>
            </div>
            <div className="mt-6 flex gap-2">
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium">VISA</div>
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium">Mastercard</div>
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium">JazzCash</div>
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium">Easypaisa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} FoodHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-brand-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-brand-400 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
