import { motion } from 'framer-motion';
import Player from '@/components/Player';
import GameBoard from '@/components/GameBoard';
import { Cross1Icon, CircleIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import {
  playerOne,
  GridValue,
  playerTwo,
  winningCombinations,
} from '@/lib/constants';
import GameOver from '@/components/GameOver';
import Confetti from '@/components/ui/confetti';
import { useDispatch } from 'react-redux';
import { showAlert, showConfetti } from '@/redux/utilSlice';

const gameOverSound = new Audio('/game_over.wav');
gameOverSound.volume = 0.2;
const clickSound = new Audio('/click.wav');
clickSound.volume = 0.5;

const Game = () => {
  const [grids, setGrids] = useState<GridValue[]>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState<string>(playerOne);
  const [strikeClass, setStrikeClass] = useState<string>('');
  const dispatch = useDispatch();

  const handleGridClick = (index: number) => {
    if (grids[index] !== null) return;

    const newGrids = [...grids];
    newGrids[index] = playerTurn as GridValue;
    setGrids(newGrids);

    if (playerTurn === playerOne) {
      setPlayerTurn(playerTwo);
    } else {
      setPlayerTurn(playerOne);
    }
  };

  const handleReset = () => {
    setGrids(Array(9).fill(null));
    setPlayerTurn(playerOne);
    setStrikeClass('');
  };

  useEffect(() => {
    const checkWinner = (
      grids: GridValue[],
      setStrike: (strikeClass: string) => void
    ) => {
      for (const { combo, strikeClass } of winningCombinations) {
        const gridValue1 = grids![combo[0]];
        const gridValue2 = grids![combo[1]];
        const gridValue3 = grids![combo[2]];

        if (
          gridValue1 !== null &&
          gridValue1 === gridValue2 &&
          gridValue1 === gridValue3
        ) {
          setStrike(strikeClass);
          dispatch(showConfetti());
          dispatch(showAlert());
          gameOverSound.play();
          // Reset the confetti after a short delay
          setTimeout(() => {
            dispatch(showConfetti());
          }, 3000);
          // if (gridValue1 === PLAYER_X) {
          //   setGameState(GameState.playerXWins);
          // } else {
          //   setGameState(GameState.playerOWins);
          // }
          return;
        }
      }

      const allGridsFilled = grids.every((grid) => grid !== null);
      if (allGridsFilled) {
        dispatch(showAlert());
        gameOverSound.play();
      }
    };

    checkWinner(grids, setStrikeClass);
  }, [grids]);

  useEffect(() => {
    if (grids.some((grid) => grid !== null)) clickSound.play();
  }, [grids]);

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
      <GameOver onReset={handleReset} />
      <Confetti />
    </div>
  );
};

export default Game;
