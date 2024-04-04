import { SubmitHandler } from 'react-hook-form';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

export const formSchema = z.object({
  playerOne: z.string().min(3).max(50),
  playerTwo: z.string().min(3).max(50),
});

export type FormInput = z.infer<typeof formSchema>;

export type GridValue = 'X' | 'O' | null;

export type Score = {
  id: string;
  playerOne: string;
  playerTwo: string;
  playerOneScore: number;
  playerTwoScore: number;
  draws: number;
  rounds: number;
};

export interface PlayersFormProps {
  onSubmit: SubmitHandler<FormInput>;
}

// This interface defines the methods available on the ref object
export interface PlayersFormHandle {
  submitForm: () => void;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const COLORS = ['#13FFA', '#1E67C6', '#CE84CF', '#DD335C'];

export const bottomBorder = 'border-b-4 border-solid border-sky-500';
export const rightBorder = 'border-r-4 border-solid border-sky-500';

export const playerOne = 'X';
export const playerTwo = 'O';

export const strikeRow1 = 'w-full h-[4px] top-[15%]';
export const strikeRow2 = 'w-full h-[4px] top-[48%]';
export const strikeRow3 = 'w-full h-[4px] top-[83%]';
export const strikeColumn1 = 'h-full w-[4px] left-[15%]';
export const strikeColumn2 = 'h-full w-[4px] left-[48%]';
export const strikeColumn3 = 'h-full w-[4px] left-[83%]';
export const strikeDiagonal1 = 'w-[90%] h-[4px] top-[50%] left-[5%] skew-y-45';
export const strikeDiagonal2 = 'w-[90%] h-[4px] top-[50%] left-[5%] skew-y-50';

export const SHAPES = ['square', 'triangle'];
export const COLOR_DIGIT = 'ABCDEF1234567890';

export const winningCombinations = [
  //Rows
  { combo: [0, 1, 2], strikeClass: strikeRow1 },
  { combo: [3, 4, 5], strikeClass: strikeRow2 },
  { combo: [6, 7, 8], strikeClass: strikeRow3 },

  //Columns
  { combo: [0, 3, 6], strikeClass: strikeColumn1 },
  { combo: [1, 4, 7], strikeClass: strikeColumn2 },
  { combo: [2, 5, 8], strikeClass: strikeColumn3 },

  //Diagonals
  { combo: [0, 4, 8], strikeClass: strikeDiagonal1 },
  { combo: [2, 4, 6], strikeClass: strikeDiagonal2 },
];

export const BASE_URL = import.meta.env.VITE_GAME_API;
