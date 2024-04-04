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
import { useDispatch, useSelector } from 'react-redux';
import { showAlert, showConfetti } from '@/redux/utilSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import {
  incrementDraws,
  incrementPlayerOneScore,
  incrementPlayerTwoScore,
  incrementRounds,
  setWinner,
} from '@/redux/gameSlice';

const gameOverSound = new Audio('/game_over.wav');
gameOverSound.volume = 0.2;
const clickSound = new Audio('/click.wav');
clickSound.volume = 0.5;

const Game = () => {
  const { game } = useSelector((state: RootState) => state.game);
  const [grids, setGrids] = useState<GridValue[]>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState<string>(playerOne);
  const [strikeClass, setStrikeClass] = useState<string>('');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

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
    dispatch(incrementRounds());
    dispatch(setWinner(''));
  };

  useEffect(() => {
    if (!game) navigate('/');
  }, [navigate, game]);

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

          if (gridValue1 === playerOne) {
            dispatch(incrementPlayerOneScore());
            dispatch(setWinner(game!.playerOne));
          } else {
            dispatch(incrementPlayerTwoScore());
            dispatch(setWinner(game!.playerTwo));
          }
          return;
        }
      }

      const allGridsFilled = grids.every((grid) => grid !== null);
      if (allGridsFilled) {
        dispatch(showAlert());
        dispatch(incrementDraws());
        gameOverSound.play();
      }
    };

    checkWinner(grids, setStrikeClass);
  }, [grids]);

  useEffect(() => {
    if (grids.some((grid) => grid !== null)) clickSound.play();
  }, [grids]);

  return (
    <div className="container h-[calc(100vh-6rem)] flex max-w-4xl mx-auto my-12 flex-col gap-32 items-center justify-center bg-blue-0 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100 p-8 font-bold shadow-lg">
      <div className="flex flex-col p-8 gap-6 justify-between items-center w-full md:flex-row md:gap-0">
        <Player
          description={`${game?.playerOne} is playing`}
          icon={<Cross1Icon />}
          playerScore={game?.playerOneScore}
          draws={game?.draws}
        />
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
        <Player
          description={`${game?.playerTwo} is playing`}
          icon={<CircleIcon />}
          playerScore={game?.playerTwoScore}
          draws={game?.draws}
        />
      </div>
      <div className="pt-8 md:pt-32">
        <GameBoard
          currentPlayer={playerTurn}
          grids={grids}
          onGridClick={handleGridClick}
          strikeClass={strikeClass}
        />
      </div>
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Round {game?.rounds}
      </h2>
      <GameOver onReset={handleReset} />
      <Confetti />
    </div>
  );
};

export default Game;
