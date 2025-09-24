'use client';

import { useEffect, useState } from 'react';

interface Measurement {
  gap?: number;
  expected?: number;
  withinTolerance: boolean;
  offset?: number;
}

interface Measurements {
  worksToHeading?: Measurement;
  ctaToAbout?: Measurement;
  topMargin?: Measurement;
  bottomMargin?: Measurement;
  logoCentering?: Measurement;
  contactCentering?: Measurement;
}

export default function MarginInspector() {
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [measurements, setMeasurements] = useState<Measurements | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const debugMode = urlParams.get('debug') === 'margins';
    setIsDebugMode(debugMode);

    if (debugMode) {
      const measureGaps = () => {
        const kkG = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--kk-g'));
        const tolerance = 2; // ±2px tolerance

        const elements = {
          works: document.querySelector('[data-id="works"]'),
          heading: document.querySelector('[data-id="heading"]'),
          cta: document.querySelector('[data-id="cta"]'),
          about: document.querySelector('[data-id="about"]'),
          logoCol: document.querySelector('[data-id="logo-col"]'),
          contact: document.querySelector('[data-id="contact"]'),
        };

        const measurements: Measurements = {};

        // Measure vertical gaps in right column
        if (elements.works && elements.heading) {
          const worksRect = elements.works.getBoundingClientRect();
          const headingRect = elements.heading.getBoundingClientRect();
          const gap = headingRect.top - worksRect.bottom;
          measurements.worksToHeading = { gap, expected: kkG, withinTolerance: Math.abs(gap - kkG) <= tolerance };
        }

        if (elements.cta && elements.about) {
          const ctaRect = elements.cta.getBoundingClientRect();
          const aboutRect = elements.about.getBoundingClientRect();
          const gap = aboutRect.top - ctaRect.bottom;
          measurements.ctaToAbout = { gap, expected: kkG, withinTolerance: Math.abs(gap - kkG) <= tolerance };
        }

        // Check top and bottom margins
        const main = document.querySelector('main');
        if (main && elements.works && elements.about) {
          const mainRect = main.getBoundingClientRect();
          const worksRect = elements.works.getBoundingClientRect();
          const aboutRect = elements.about.getBoundingClientRect();
          
          const topMargin = worksRect.top - mainRect.top;
          const bottomMargin = mainRect.bottom - aboutRect.bottom;
          
          measurements.topMargin = { gap: topMargin, expected: kkG, withinTolerance: Math.abs(topMargin - kkG) <= tolerance };
          measurements.bottomMargin = { gap: bottomMargin, expected: kkG, withinTolerance: Math.abs(bottomMargin - kkG) <= tolerance };
        }

        // Check horizontal centering of logo and contact
        if (elements.logoCol && elements.contact) {
          const logoColRect = elements.logoCol.getBoundingClientRect();
          const logoContent = elements.logoCol.querySelector('div');
          const contactRect = elements.contact.getBoundingClientRect();
          
          if (logoContent) {
            const logoContentRect = logoContent.getBoundingClientRect();
            const logoCenter = logoContentRect.left + logoContentRect.width / 2;
            const colCenter = logoColRect.left + logoColRect.width / 2;
            measurements.logoCentering = { 
              offset: Math.abs(logoCenter - colCenter), 
              withinTolerance: Math.abs(logoCenter - colCenter) <= tolerance 
            };
          }
          
          const contactCenter = contactRect.left + contactRect.width / 2;
          const colCenter = logoColRect.left + logoColRect.width / 2;
          measurements.contactCentering = { 
            offset: Math.abs(contactCenter - colCenter), 
            withinTolerance: Math.abs(contactCenter - colCenter) <= tolerance 
          };
        }

        setMeasurements(measurements);

        // Log results to console
        console.group('🔍 Margin Inspector Results');
        console.log(`--kk-g value: ${kkG}px`);
        
        Object.entries(measurements).forEach(([key, value]: [string, Measurement]) => {
          if (value.withinTolerance) {
            console.log(`✅ ${key}: ${value.gap || value.offset}px (expected: ${value.expected || 'centered'})`);
          } else {
            console.warn(`❌ ${key}: ${value.gap || value.offset}px (expected: ${value.expected || 'centered'}) - DEVIATION!`);
          }
        });
        console.groupEnd();
      };

      // Measure after a short delay to ensure layout is complete
      setTimeout(measureGaps, 100);
      
      // Re-measure on resize
      window.addEventListener('resize', measureGaps);
      return () => window.removeEventListener('resize', measureGaps);
    }
  }, []);

  if (!isDebugMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Overlay boxes for visualization */}
      {measurements && (
        <>
          {/* Top margin box */}
          {measurements.topMargin && (
            <div 
              className="absolute bg-green-500 bg-opacity-20 border-2 border-green-500"
              style={{
                top: 0,
                left: 0,
                right: 0,
                height: `${measurements.topMargin.gap}px`,
              }}
            >
              <div className="absolute bottom-0 left-2 text-xs text-green-700 font-mono">
                Top: {measurements.topMargin.gap}px (expected: {measurements.topMargin.expected}px)
              </div>
            </div>
          )}
          
          {/* Bottom margin box */}
          {measurements.bottomMargin && (
            <div 
              className="absolute bg-green-500 bg-opacity-20 border-2 border-green-500"
              style={{
                bottom: 0,
                left: 0,
                right: 0,
                height: `${measurements.bottomMargin.gap}px`,
              }}
            >
              <div className="absolute top-0 left-2 text-xs text-green-700 font-mono">
                Bottom: {measurements.bottomMargin.gap}px (expected: {measurements.bottomMargin.expected}px)
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
