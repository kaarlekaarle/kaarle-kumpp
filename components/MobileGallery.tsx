'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface Slide {
  src: string;
  alt?: string;
}

interface MobileGalleryProps {
  slides: Slide[];
}

export default function MobileGallery({ slides }: MobileGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!slides || slides.length === 0) return null;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && slides.length > 1) {
      goToNext();
    }
    if (isRightSwipe && slides.length > 1) {
      goToPrevious();
    }
  };

  return (
    <div>
      {/* Dots above image */}
      {slides.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: index === currentIndex ? '#000' : '#ccc',
                cursor: 'pointer',
                padding: 0
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image */}
      <div 
        style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={slides[currentIndex].src}
          alt={slides[currentIndex].alt || ''}
          fill
          style={{ objectFit: 'contain' }}
          sizes="100vw"
          priority={currentIndex === 0}
        />
      </div>
    </div>
  );
}

