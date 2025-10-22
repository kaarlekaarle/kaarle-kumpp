'use client';

import { useState, useRef } from 'react';

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

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // Only handle swipe if it's a significant gesture
    if (Math.abs(distance) > 50) {
      e.preventDefault(); // Prevent click events only for swipes
      
      if (isLeftSwipe && slides.length > 1) {
        goToNext();
      }
      if (isRightSwipe && slides.length > 1) {
        goToPrevious();
      }
    }
    
    // Reset touch positions
    touchStartX.current = null;
    touchEndX.current = null;
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
        style={{ 
          position: 'relative', 
          width: '100%', 
          aspectRatio: '4/3',
          touchAction: 'pan-x pinch-zoom' // Allow horizontal panning and pinch zoom, but not vertical panning
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={slides[currentIndex].src}
          alt={slides[currentIndex].alt || ''}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain' 
          }}
        />
      </div>
    </div>
  );
}

