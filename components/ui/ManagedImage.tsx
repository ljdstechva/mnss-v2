/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { cn } from '@/lib/utils'

type ManagedImageProps = {
  src?: string | null
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
  fallbackSrc?: string
}

const defaultFallback =
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop'
const nextImageHosts = new Set(['images.unsplash.com'])

export function ManagedImage({
  src,
  alt,
  className,
  priority,
  sizes,
  fallbackSrc = defaultFallback,
}: ManagedImageProps) {
  const imageSrc = src?.trim() || fallbackSrc

  if (canUseNextImage(imageSrc)) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
      />
    )
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      className={cn('absolute inset-0 h-full w-full', className)}
    />
  )
}

function canUseNextImage(src: string) {
  if (src.startsWith('/')) {
    return true
  }

  try {
    const url = new URL(src)
    return url.protocol === 'https:' && nextImageHosts.has(url.hostname)
  } catch {
    return false
  }
}
