import { useCallback, useRef } from 'react';

export function useResizable(initialWidth = 66.66, minWidth = 30, maxWidth = 80) {
  const isDragging = useRef(false);
  const containerRef = useRef(null);

  const startDrag = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    // Disable pointer events on iframes during drag to prevent drop-off
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => iframe.style.pointerEvents = 'none');

    const handlePointerMove = (moveEvent) => {
      if (!isDragging.current) return;
      
      let newWidth = (moveEvent.clientX / window.innerWidth) * 100;
      if (newWidth < minWidth) newWidth = minWidth;
      if (newWidth > maxWidth) newWidth = maxWidth;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--left-width', `${newWidth}%`);
      }
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      iframes.forEach(iframe => iframe.style.pointerEvents = '');
      
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  }, [minWidth, maxWidth]);

  return { containerRef, startDrag, initialWidth };
}
