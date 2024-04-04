import { SubmitHandler } from 'react-hook-form';
import { FormInput } from './utils';
import { ColumnDef } from '@tanstack/react-table';

export type GridValue = 'X' | 'O' | null;

export type Score = {
  id: string;
  playerOne: string;
  playerTwo: string;
  playerOneScore: number;
  playerTwoScore: number;
  draws: number;
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

export const PLAYER_ONE = 'X';
export const PLAYER_TWO = 'O';

export const strikeRow1 = 'w-full h-[4px] top-[15%]';
export const strikeRow2 = 'w-full h-[4px] top-[48%]';
export const strikeRow3 = 'w-full h-[4px] top-[83%]';
export const strikeColumn1 = 'h-full w-[4px] left-[15%]';
export const strikeColumn2 = 'h-full w-[4px] left-[48%]';
export const strikeColumn3 = 'h-full w-[4px] left-[83%]';
export const strikeDiagonal1 = 'w-[90%] h-[4px] top-[50%] left-[5%] skew-y-45';
export const strikeDiagonal2 = 'w-[90%] h-[4px] top-[50%] left-[5%] skew-y--45';
