import { Star, StarHalf } from 'lucide-react'

export default function RatingStars({ rating = 0, size = 16, showValue = false, reviews }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-gold-400 text-gold-400" />
        ))}
        {hasHalf && <StarHalf size={size} className="fill-gold-400 text-gold-400" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-gray-300" />
        ))}
      </div>
      {showValue && <span className="text-sm font-semibold text-charcoal">{rating}</span>}
      {reviews && <span className="text-xs text-gray-400">({reviews})</span>}
    </div>
  )
}
