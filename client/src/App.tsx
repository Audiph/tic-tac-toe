import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import PlayersForm, { PlayersFormHandle } from './components/PlayersForm';
import ScoreBoard from '@/components/ScoreBoard';
import { Score, columns } from '@/components/ui/columns';
import { FormInput } from './lib/utils';
import { SubmitHandler } from 'react-hook-form';

export const COLORS = ['#13FFA', '#1E67C6', '#CE84CF', '#DD335C'];

async function getData(): Promise<Score[]> {
  // Fetch data from your API here.
  return [
    {
      id: 'asdawdad',
      playerOne: 'John',
      playerTwo: 'Jane',
      playerOneScore: 3,
      playerTwoScore: 2,
      draws: 4,
    },
    {
      id: 'testadawd',
      playerOne: 'Mecca',
      playerTwo: 'Jeff',
      playerOneScore: 4,
      playerTwoScore: 1,
      draws: 9,
    },
    // ...
  ];
}

const App: React.FC = () => {
  const color = useMotionValue(COLORS[0]);
  const backgroundImageHero = useMotionTemplate`radial-gradient(125% 125% at 50% 100%, transparent 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const [data, setData] = useState<Score[]>([]);

  const playersFormRef = useRef<PlayersFormHandle>(null);

  const handleStartGame = () => {
    if (playersFormRef.current) {
      playersFormRef.current.submitForm();
    }
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    animate(color, COLORS, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, [color]);

  return (
    <>
      <motion.section
        style={{ backgroundImage: backgroundImageHero }}
        className="flex w-full h-screen flex-col items-center justify-center gap-2 px-4"
      >
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-balance">
          Tic Tac Toe
        </h1>
        <span className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          Classic Tic Tac Toe game for 2 players
        </span>
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                style={{ border, boxShadow }}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 z-10"
              >
                Play
              </motion.button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Player Names</DialogTitle>
                <DialogDescription>
                  Enter names of both players to start.
                </DialogDescription>
              </DialogHeader>
              {/* Content */}
              <PlayersForm onSubmit={onSubmit} ref={playersFormRef} />
              <DialogFooter>
                <Button type="button" onClick={handleStartGame}>
                  Start Game
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <a
            href="#score-board"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 z-10"
          >
            View Scoreboard
          </a>
        </div>
      </motion.section>
      <motion.div
        id="score-board"
        className="flex w-full h-screen flex-col items-center justify-center gap-4 px-4"
      >
        <ScoreBoard columns={columns} data={data} />
      </motion.div>
      <div className="fixed inset-0 -z-10">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </>
  );
};

export default App;
