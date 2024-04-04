import { GridValue, bottomBorder, rightBorder } from '@/lib/constants';
import Grid from './Grid';
import Strike from './Strike';

interface GameBoardProps {
  currentPlayer: string;
  grids: GridValue[];
  onGridClick: (index: number) => void;
  strikeClass: string;
}

const GameBoard = ({
  currentPlayer,
  grids,
  onGridClick,
  strikeClass,
}: GameBoardProps) => {
  return (
    <div className="grid grid-rows-mini-layout grid-cols-mini-layout md:grid-rows-layout md:grid-cols-layout cursor-pointer relative">
      <Grid
        currentPlayer={currentPlayer}
        onClick={() => onGridClick(0)}
        value={grids[0]}
        className={`${bottomBorder} ${rightBorder}`}
      />
      <Grid
        currentPlayer={currentPlayer}
        onClick={() => onGridClick(1)}
        value={grids[1]}
        className={`${bottomBorder} ${rightBorder}`}
      />
      <Grid
        currentPlayer={currentPlayer}
        onClick={() => onGridClick(2)}
        value={grids[2]}
        className={`${bottomBorder}`}
      />
      <Grid
        currentPlayer={currentPlayer}
        onClick={() => onGridClick(3)}
        value={grids[3]}
        className={`${bottomBorder} ${rightBorder}`}
      />
      <Grid
        currentPlayer={currentPlayer}
        onClick={() => onGridClick(4)}
        value={grids[4]}
        className={`${bottomBorder} ${rightBorder}`}
      />
      <Grid
        currentPlayer={currentPlayer}
        onClick={() => onGridClick(5)}
        value={grids[5]}
        className={`${bottomBorder}`}
      />
      <Grid
        currentPlayer={currentPlayer}
        onClick={() => onGridClick(6)}
        value={grids[6]}
        className={`${rightBorder}`}
      />
      <Grid
        currentPlayer={currentPlayer}
        onClick={() => onGridClick(7)}
        value={grids[7]}
        className={`${rightBorder}`}
      />
      <Grid
        currentPlayer={currentPlayer}
        onClick={() => onGridClick(8)}
        value={grids[8]}
        className=""
      />
      <Strike strikeClass={strikeClass} />
    </div>
  );
};

export default GameBoard;
