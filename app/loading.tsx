export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-16 bg-gray-200 dark:bg-slate-700 mb-4" />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="h-96 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-slate-700 dark:to-slate-800 rounded-2xl" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-slate-700 rounded-xl" />
          ))}
        </div>
        <div className="h-64 bg-gray-200 dark:bg-slate-700 rounded-2xl" />
      </div>
    </div>
  )
}
