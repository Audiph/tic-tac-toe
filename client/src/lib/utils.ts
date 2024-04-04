import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { COLOR_DIGIT } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateRandomColor = () => {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += COLOR_DIGIT[Math.floor(Math.random() * COLOR_DIGIT.length)];
  }
  return color;
};
