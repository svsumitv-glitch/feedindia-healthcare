'use client'

import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null
    let rafId: number

    const init = async () => {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({ duration: 1.2, smoothWheel: true }) as typeof lenis
      const raf = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()
    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])
}
