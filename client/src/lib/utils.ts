import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formSchema = z.object({
  playerOne: z.string().min(3).max(50),
  playerTwo: z.string().min(3).max(50),
});

export type FormInput = z.infer<typeof formSchema>;
