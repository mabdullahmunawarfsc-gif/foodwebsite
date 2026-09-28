export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const skeletons = {
    card: (
      <div className="card animate-pulse">
        <div className="h-48 bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="flex justify-between items-center pt-2">
            <div className="h-5 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-20" />
          </div>
        </div>
      </div>
    ),
    list: (
      <div className="flex gap-4 animate-pulse">
        <div className="h-24 w-24 bg-gray-200 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    ),
    hero: (
      <div className="h-64 md:h-96 bg-gray-200 rounded-2xl animate-pulse" />
    ),
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{skeletons[type]}</div>
      ))}
    </>
  )
}
