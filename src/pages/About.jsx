import { motion } from 'framer-motion'
import { Users, Award, Clock, MapPin, Leaf, Heart } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'

const stats = [
  { icon: Users, value: '50,000+', label: 'Happy Customers' },
  { icon: Award, value: '15+', label: 'Awards Won' },
  { icon: Clock, value: '5+', label: 'Years of Service' },
  { icon: MapPin, value: '6', label: 'Cities Served' },
]

const values = [
  { icon: Leaf, title: 'Fresh Ingredients', desc: 'We source the freshest ingredients daily from local suppliers to ensure every dish is packed with flavor.' },
  { icon: Heart, title: 'Made with Love', desc: 'Every recipe is crafted with passion and care, bringing restaurant-quality food to your home.' },
  { icon: Users, title: 'Community First', desc: 'We are proud to be part of your community, creating memories one meal at a time.' },
  { icon: Award, title: 'Quality Promise', desc: 'If you are not 100% satisfied, we will make it right. That is our promise to you.' },
]

const team = [
  { name: 'Chef Ahmed Khan', role: 'Head Chef', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&q=80' },
  { name: 'Chef Fatima Ali', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=300&q=80' },
  { name: 'Chef Bilal Ahmed', role: 'Grill Master', image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=300&q=80' },
  { name: 'Chef Ayesha Malik', role: 'Menu Developer', image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=300&q=80' },
]

export default function About() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-600 py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Our Story</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              From a small kitchen in Lahore to becoming Pakistan's favorite food delivery brand
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80"
                alt="Our restaurant"
                className="rounded-2xl shadow-lift"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-display font-bold text-charcoal mb-4">How It All Started</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                FoodHub was born in 2021 from a simple idea: everyone deserves access to delicious, high-quality food without the hassle of cooking or dining out. What started as a small team of 5 people in a tiny kitchen in Gulberg, Lahore, has now grown to serve thousands of happy customers across Pakistan.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that great food brings people together. That is why we work tirelessly to source the finest ingredients, perfect our recipes, and deliver your meals with the same care and attention we would give to our own family.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-soft"
              >
                <div className="h-14 w-14 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={28} className="text-brand-500" />
                </div>
                <p className="text-3xl font-display font-bold text-charcoal">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading title="Our Values" subtitle="The principles that guide everything we do" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-cream"
              >
                <div className="h-14 w-14 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon size={28} className="text-brand-500" />
                </div>
                <h3 className="font-display font-bold text-charcoal mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <SectionHeading title="Meet Our Chefs" subtitle="The talented people behind your favorite dishes" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-soft text-center"
              >
                <img src={member.image} alt={member.name} className="h-48 w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <h3 className="font-display font-bold text-charcoal">{member.name}</h3>
                  <p className="text-sm text-brand-500">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
