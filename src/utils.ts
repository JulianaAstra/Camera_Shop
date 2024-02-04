import { MouseEvent } from 'react';

export function scrollToTop() {
  const scrollStep = -window.scrollY / (1000 / 30);
  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}

type Event = MouseEvent<HTMLDivElement>;

export const handleOverlayClick = (event: Event, onCloseFunction: () => void) => {
  if (event.target === event.currentTarget) {
    onCloseFunction();
  }
};

