import { motion } from 'framer-motion';
import Player from '@/components/Player';
import GameBoard from '@/components/GameBoard';
import { Cross1Icon, CircleIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { PLAYER_ONE, GridValue, PLAYER_TWO } from '@/lib/constants';

const Game = () => {
  const [grids, setGrids] = useState<GridValue[]>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState<string>(PLAYER_ONE);
  const [strikeClass, setStrikeClass] = useState<string>('');

  const handleGridClick = (index: number) => {
    if (grids[index] !== null) return;

    const newGrids = [...grids];
    newGrids[index] = playerTurn as GridValue;
    setGrids(newGrids);

    if (playerTurn === PLAYER_ONE) {
      setPlayerTurn(PLAYER_TWO);
    } else {
      setPlayerTurn(PLAYER_ONE);
    }
  };

  return (
    <div className="container h-[calc(100vh-6rem)] flex max-w-4xl mx-auto my-12 flex-col gap-32 items-center justify-start bg-blue-0 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100 p-8 font-bold shadow-lg">
      <div className="flex flex-col p-8 gap-6 justify-between items-center w-full md:flex-row md:gap-0">
        <Player description="Jane is playing" icon={<Cross1Icon />} />
        <motion.div
          style={{
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor: '#fff',
            color: '#000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          animate={{ rotate: 360 }}
          transition={{ ease: 'easeInOut', duration: 2, repeat: Infinity }}
        >
          <h1 className="text-xl fixed">VS</h1>
        </motion.div>
        <Player description="John is playing" icon={<CircleIcon />} />
      </div>
      <div className="pt-8 md:pt-32">
        <GameBoard
          currentPlayer={playerTurn}
          grids={grids}
          onGridClick={handleGridClick}
          strikeClass={strikeClass}
        />
      </div>
    </div>
  );
};

export default Game;
