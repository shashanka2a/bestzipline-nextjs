"use client";

import { useEffect } from 'react';

export function PerformanceOptimizer() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Disable animations for users who prefer reduced motion
      document.documentElement.style.setProperty('--animation-duration', '0s');
      document.documentElement.style.setProperty('--transition-duration', '0s');
    }

    // Optimize for low-end devices
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    if (isLowEndDevice) {
      // Reduce animation complexity for low-end devices
      document.documentElement.classList.add('low-end-device');
    }

    // Handle connection quality
    const connection = (navigator as any).connection;
    if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
      // Disable heavy animations on slow connections
      document.documentElement.classList.add('slow-connection');
    }

    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = '/icon-192.svg';
    preloadLink.as = 'image';
    document.head.appendChild(preloadLink);

    // Cleanup
    return () => {
      document.head.removeChild(preloadLink);
    };
  }, []);

  return null;
}
