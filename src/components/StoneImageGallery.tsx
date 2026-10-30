import { useState } from 'react';
import { Gem } from 'lucide-react';

interface StoneImageGalleryProps {
  images: string[];
  alt: string;
}

export default function StoneImageGallery({ images, alt }: StoneImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-charcoal-700 bg-charcoal-900">
        {activeImage ? (
          <img
            key={activeImage}
            src={activeImage}
            alt={alt}
            className="h-full w-full object-cover animate-fade-in"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-bronze-500/60">
            <Gem className="h-16 w-16" aria-hidden="true" />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`نمایش تصویر ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={`aspect-square overflow-hidden rounded-xl border-2 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-300 ${
                index === activeIndex ? 'border-bronze-400' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
