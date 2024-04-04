import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { RootState } from '@/redux/store';
import { hideAlert } from '@/redux/utilSlice';
import { useDispatch, useSelector } from 'react-redux';

const GameOver = ({ onReset }: { onReset: () => void }) => {
  const { alert } = useSelector((state: RootState) => state.util);
  const dispatch = useDispatch();

  return (
    <AlertDialog open={alert}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="place-self-center">
            <h1 className="scroll-m-20 mb-4 mx-8 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Player One wins!
            </h1>
          </AlertDialogTitle>
          <AlertDialogDescription>
            You may choose to <strong>Exit</strong> to finish the game or{' '}
            <strong>Rematch</strong> to play again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-self-center gap-4 md:gap-12">
          <AlertDialogCancel
            onClick={() => {
              dispatch(hideAlert());
              onReset();
            }}
          >
            Exit
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => dispatch(hideAlert())}>
            Rematch
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GameOver;
