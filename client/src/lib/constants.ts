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
