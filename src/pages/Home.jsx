import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { ArrowRight, Truck, Clock, Shield, Leaf, Star, ChevronRight, Smartphone, BadgePercent } from 'lucide-react'
import HeroSection from '../components/common/HeroSection'
import ProductCard from '../components/common/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import RatingStars from '../components/ui/RatingStars'
import { getBestsellers } from '../data/products'
import { deals } from '../data/deals'
import { testimonials } from '../data/testimonials'
import { categories } from '../data/categories'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const categoryIcons = {
  Grid3X3: '🍽️',
  Pizza: '🍕',
  Beef: '🍔',
  Sandwich: '🌯',
  UtensilsCrossed: '🍝',
  Cookie: '🍟',
  CupSoda: '🥤',
  IceCreamCone: '🍨',
  BadgePercent: '🏷️',
}

export default function Home() {
  const bestsellers = getBestsellers()

  return (
    <div>
      <HeroSection />

      {/* Promo Banner Slider */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
            className="rounded-2xl overflow-hidden"
          >
            {deals.slice(0, 3).map((deal) => (
              <SwiperSlide key={deal.id}>
                <div className="relative h-64 md:h-80 bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 h-full flex items-center px-8 md:px-16">
                    <div className="max-w-md">
                      <span className="inline-block bg-gold-400 text-charcoal text-xs font-bold px-3 py-1 rounded-full mb-3">
                        {deal.discount}% OFF
                      </span>
                      <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">
                        {deal.title}
                      </h3>
                      <p className="text-white/80 text-sm md:text-base mb-4">{deal.description}</p>
                      <Link to="/deals" className="inline-flex items-center gap-2 bg-white text-brand-500 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                        Order Now <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Category Strip */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <SectionHeading
            title="What are you craving?"
            subtitle="Explore our wide range of categories"
          />
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/menu?category=${cat.id}`}
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-3xl">{categoryIcons[cat.icon]}</span>
                  <span className="text-xs font-semibold text-charcoal">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8">
            <SectionHeading title="Best Sellers" subtitle="Our most loved dishes" centered={false} />
            <Link to="/menu" className="hidden md:inline-flex items-center gap-1 text-brand-500 font-semibold hover:gap-2 transition-all">
              View All <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/menu" className="btn-outline">View All Items</Link>
          </div>
        </div>
      </section>

      {/* Today's Deals */}
      <section className="section-padding bg-gradient-to-br from-brand-500 to-brand-600">
        <div className="container-custom">
          <SectionHeading
            title="Today's Hot Deals"
            subtitle="Limited time offers you don't want to miss"
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deals.slice(0, 3).map((deal, i) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lift"
              >
                <div className="relative">
                  <img src={deal.image} alt={deal.title} className="h-48 w-full object-cover" loading="lazy" />
                  <div className="absolute top-3 left-3 bg-gold-400 text-charcoal text-sm font-bold px-3 py-1 rounded-full">
                    {deal.discount}% OFF
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-charcoal">{deal.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{deal.description}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xl font-bold text-brand-500">Rs. {deal.dealPrice.toLocaleString()}</span>
                    <span className="text-sm text-gray-400 line-through">Rs. {deal.originalPrice.toLocaleString()}</span>
                  </div>
                  <Link to="/deals" className="mt-4 btn-primary w-full">Grab This Deal</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            title="How It Works"
            subtitle="Ordering your favorite food is just 3 easy steps away"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🍽️', title: 'Choose Your Food', desc: 'Browse our menu and pick your favorite dishes' },
              { icon: '📱', title: 'Place Your Order', desc: 'Add to cart, apply promo codes, and checkout' },
              { icon: '🚀', title: 'Fast Delivery', desc: 'Get your food delivered hot in 30-45 minutes' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8 rounded-2xl bg-cream hover:shadow-soft transition-shadow"
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="inline-flex items-center justify-center h-8 w-8 bg-brand-500 text-white rounded-full text-sm font-bold mb-3">
                  {i + 1}
                </div>
                <h3 className="font-display font-bold text-xl text-charcoal mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <SectionHeading
            title="Why Choose FoodHub?"
            subtitle="We go the extra mile to make your experience amazing"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: 'Fresh Ingredients', desc: 'We use only the freshest, highest quality ingredients' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Average delivery time of 30-45 minutes' },
              { icon: Shield, title: 'Safe & Hygienic', desc: 'Strict hygiene protocols in every branch' },
              { icon: Clock, title: 'Open Late', desc: 'Serving you from 11 AM to midnight, every day' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-soft text-center hover:shadow-lift transition-shadow"
              >
                <div className="h-14 w-14 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-brand-500" />
                </div>
                <h3 className="font-display font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            title="What Our Customers Say"
            subtitle="Real reviews from real food lovers"
          />
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-cream rounded-2xl p-6 h-full">
                  <RatingStars rating={t.rating} />
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed">"{t.text}"</p>
                  <div className="mt-4 flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                    <div>
                      <p className="font-semibold text-sm text-charcoal">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.location}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="section-padding bg-charcoal">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Smartphone size={16} />
                Coming Soon
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Get the FoodHub App
              </h2>
              <p className="text-gray-400 mb-6">
                Order on the go with our mobile app. Exclusive app-only deals, faster checkout, and real-time order tracking.
              </p>
              <div className="flex gap-4">
                <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-xl">
                  <span className="text-2xl">🍎</span>
                  <div>
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="text-white font-semibold">App Store</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-xl">
                  <span className="text-2xl">▶️</span>
                  <div>
                    <p className="text-xs text-gray-400">Get it on</p>
                    <p className="text-white font-semibold">Google Play</p>
                  </div>
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:flex justify-center"
            >
              <div className="relative">
                <div className="h-80 w-48 bg-gradient-to-b from-brand-500 to-brand-600 rounded-3xl shadow-lift flex items-center justify-center">
                  <Smartphone size={80} className="text-white/30" />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-8 top-8 bg-white rounded-2xl shadow-lift p-3"
                >
                  <BadgePercent size={24} className="text-brand-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
