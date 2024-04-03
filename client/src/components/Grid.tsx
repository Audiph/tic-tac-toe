import { GridValue } from '@/lib/constants';

interface GridProps {
  className: string;
  value: GridValue;
  onClick: () => void;
}

const Grid = ({ className, value, onClick }: GridProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center ${
        !value ? 'p-10 md:p-16' : 'p-10 text-2xl md:text-6xl'
      } ${className}`}
    >
      {value}
    </div>
  );
};

export default Grid;
