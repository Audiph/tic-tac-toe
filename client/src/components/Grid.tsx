import { GridValue } from '@/lib/constants';

interface GridProps {
  currentPlayer: string;
  className: string;
  value: GridValue;
  onClick: () => void;
}

const Grid = ({ currentPlayer, className, value, onClick }: GridProps) => {
  let hoverClass = null;

  console.log(currentPlayer);

  if (value === null && currentPlayer !== null) {
    hoverClass = 'grid-cell hover:opacity-40';
  }

  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center text-3xl md:text-6xl ${className} ${hoverClass}`}
      data-player={`${currentPlayer}`}
    >
      {value}
    </div>
  );
};

export default Grid;
