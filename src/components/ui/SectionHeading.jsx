import { motion } from 'framer-motion'

export default function SectionHeading({ title, subtitle, centered = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-8 md:mb-12 ${centered ? 'text-center' : 'text-left'}`}
    >
      <h2 className={`text-2xl md:text-4xl font-display font-bold ${light ? 'text-white' : 'text-charcoal'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base md:text-lg ${light ? 'text-white/70' : 'text-gray-500'} ${centered ? 'max-w-2xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-16 bg-brand-500 rounded-full ${centered ? 'mx-auto' : ''}`} />
    </motion.div>
  )
}
