'use client'

import type { LenisOptions, VirtualScrollData } from 'lenis'
import { ReactLenis, type LenisRef } from 'lenis/react'
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null)
  const [smoothScrollEnabled, setSmoothScrollEnabled] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateSmoothScrollPreference = () => {
      setSmoothScrollEnabled(!mediaQuery.matches)
    }

    updateSmoothScrollPreference()
    mediaQuery.addEventListener('change', updateSmoothScrollPreference)

    return () => {
      mediaQuery.removeEventListener('change', updateSmoothScrollPreference)
    }
  }, [])

  const resetQueuedBottomScroll = useCallback(({ deltaY }: VirtualScrollData) => {
    const lenis = lenisRef.current?.lenis

    if (!lenis || deltaY >= 0) {
      return true
    }

    const isReversingAfterBottomClamp =
      lenis.targetScroll >= lenis.limit && lenis.animatedScroll < lenis.limit

    if (isReversingAfterBottomClamp) {
      lenis.scrollTo(lenis.animatedScroll, { immediate: true, force: true })
    }

    return true
  }, [])

  const options = useMemo<LenisOptions>(
    () => ({
      autoRaf: smoothScrollEnabled,
      autoResize: true,
      infinite: false,
      lerp: 0.1,
      overscroll: false,
      smoothWheel: smoothScrollEnabled,
      stopInertiaOnNavigate: true,
      virtualScroll: resetQueuedBottomScroll,
    }),
    [resetQueuedBottomScroll, smoothScrollEnabled]
  )

  return (
    <ReactLenis root ref={lenisRef} options={options}>
      {children}
    </ReactLenis>
  )
}
