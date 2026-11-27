import { useState } from 'react';

export interface ResponsiveImageSources {
  src400: string;
  src800: string;
  src1200: string;
  webp400?: string;
  webp800?: string;
  webp1200?: string;
}

interface ResponsiveImageProps {
  sources: ResponsiveImageSources;
  alt: string;
  sizes?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fallbackLabel?: string;
}

/**
 * Reusable responsive image component built for Core Web Vitals:
 * - Serves WebP via `<picture>` + `<source type="image/webp">` with JPEG fallback
 * - Uses `srcset` (400w, 800w, 1200w) and `sizes` to match device & container width
 * - Sets explicit `width` / `height` to prevent Cumulative Layout Shift (CLS)
 * - Uses eager + high fetchPriority for above-the-fold LCP images and lazy + async decoding below the fold
 */
export function ResponsiveImage({
  sources,
  alt,
  sizes = '(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 380px',
  width = 1200,
  height = 896,
  priority = false,
  className = 'h-full w-full object-cover',
  fallbackLabel,
}: ResponsiveImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(priority);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full items-center justify-center bg-[#e9e3dd] p-4 text-center text-xs font-medium text-[#575b66] dark:bg-[#23293a] dark:text-[#b9bec9]"
      >
        <span>{fallbackLabel || alt}</span>
      </div>
    );
  }

  const jpegSrcSet = `${sources.src400} 400w, ${sources.src800} 800w, ${sources.src1200} 1200w`;
  const webpSrcSet =
    sources.webp400 && sources.webp800 && sources.webp1200
      ? `${sources.webp400} 400w, ${sources.webp800} 800w, ${sources.webp1200} 1200w`
      : undefined;

  return (
    <picture className="block h-full w-full">
      {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
      <img
        src={sources.src800}
        srcSet={jpegSrcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </picture>
  );
}
