import { MouseEvent } from 'react';
import { TabName } from './const';

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

export function containsOnlyDigits(str: string) {
  return /^\d+$/.test(str);
}

export function containsNumberInRange(str: string, min: number, max: number) {
  const number = parseInt(str, 10);
  return !isNaN(number) && number >= min && number <= max;
}

export function matcehsTabName(tabName: string) {
  const trimmedTabName = tabName.trim(). toLowerCase();
  return trimmedTabName === TabName.Characteristics || trimmedTabName === TabName.Description;
}

export function formatNumberWithSpaces(number: number) {
  const numberString = number.toString();
  const parts = numberString.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return parts.join('.');
}
