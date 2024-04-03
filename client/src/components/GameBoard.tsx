import { GridValue, bottomBorder, rightBorder } from '@/lib/constants';
import Grid from './Grid';
import Strike from './Strike';

interface GameBoardProps {
  grids: GridValue[];
  onGridClick: (index: number) => void;
}

const GameBoard = ({ grids, onGridClick }: GameBoardProps) => {
  return (
    <div className="grid grid-rows-3 grid-cols-3 cursor-pointer relative">
      <Grid
        onClick={() => onGridClick(0)}
        value={grids[0]}
        className={`${bottomBorder} ${rightBorder}`}
      />
      <Grid
        onClick={() => onGridClick(1)}
        value={grids[1]}
        className={`${bottomBorder} ${rightBorder}`}
      />
      <Grid
        onClick={() => onGridClick(2)}
        value={grids[2]}
        className={`${bottomBorder}`}
      />
      <Grid
        onClick={() => onGridClick(3)}
        value={grids[3]}
        className={`${bottomBorder} ${rightBorder}`}
      />
      <Grid
        onClick={() => onGridClick(4)}
        value={grids[4]}
        className={`${bottomBorder} ${rightBorder}`}
      />
      <Grid
        onClick={() => onGridClick(5)}
        value={grids[5]}
        className={`${bottomBorder}`}
      />
      <Grid
        onClick={() => onGridClick(6)}
        value={grids[6]}
        className={`${rightBorder}`}
      />
      <Grid
        onClick={() => onGridClick(7)}
        value={grids[7]}
        className={`${rightBorder}`}
      />
      <Grid onClick={() => onGridClick(8)} value={grids[8]} className="" />
      <Strike />
    </div>
  );
};

export default GameBoard;
