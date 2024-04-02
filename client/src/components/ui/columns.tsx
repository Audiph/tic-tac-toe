import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Score = {
  id: string;
  playerOne: string;
  playerTwo: string;
  playerOneScore: number;
  playerTwoScore: number;
  draws: number;
};

export const columns: ColumnDef<Score>[] = [
  {
    accessorKey: 'playerOne',
    header: 'Player 1',
  },
  {
    accessorKey: 'playerTwo',
    header: 'Player 2',
  },
  {
    accessorKey: 'playerOneScore',
    header: 'Score (Player 1)',
  },
  {
    accessorKey: 'playerTwoScore',
    header: 'Score (Player 2)',
  },
  {
    accessorKey: 'draws',
    header: 'Draws',
  },
];
