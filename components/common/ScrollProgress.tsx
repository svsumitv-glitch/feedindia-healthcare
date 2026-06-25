'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
