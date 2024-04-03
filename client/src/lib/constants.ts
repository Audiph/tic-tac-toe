import { SubmitHandler } from 'react-hook-form';
import { FormInput } from './utils';
import { ColumnDef } from '@tanstack/react-table';

export const COLORS = ['#13FFA', '#1E67C6', '#CE84CF', '#DD335C'];

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
