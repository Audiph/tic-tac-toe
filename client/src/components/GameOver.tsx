import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { BASE_URL, Score } from '@/lib/constants';
import { AppDispatch, RootState } from '@/redux/store';
import { hideAlert, hideLoading, showLoading } from '@/redux/utilSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from './ui/use-toast';
import { setGame, setWinner } from '@/redux/gameSlice';
import { useNavigate } from 'react-router-dom';
import Loading from './ui/loading';

const GameOver = ({ onReset }: { onReset: () => void }) => {
  const { alert, loading } = useSelector((state: RootState) => state.util);
  const { game, winner } = useSelector((state: RootState) => state.game);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleExit = async (data: Score) => {
    dispatch(showLoading());
    try {
      const res = await axios.put(`${BASE_URL}/api/v1/game/${data._id}`, data);
      if (!res.data.success) {
        toast({
          title: "Something's wrong",
          description: res.data.message,
        });
        dispatch(hideLoading());
        return;
      }
      dispatch(setGame(null));
      dispatch(setWinner(''));
    } catch (error) {
      toast({
        title: "Something's wrong!",
        description: "There's an error while updating result.",
      });
    } finally {
      dispatch(hideLoading());
      navigate('/');
    }
  };

  return (
    <AlertDialog open={alert}>
      <AlertDialogContent>
        {loading ? (
          <Loading size="10" />
        ) : (
          <AlertDialogHeader>
            <AlertDialogTitle className="place-self-center">
              <span className="scroll-m-20 mb-4 mx-8 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {winner === '' ? "It's a Draw!" : `${winner} won!`}
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              You may choose to <strong>Exit</strong> to finish the game or{' '}
              <strong>Rematch</strong> to play again.
            </AlertDialogDescription>
          </AlertDialogHeader>
        )}
        <AlertDialogFooter className="justify-self-center gap-4 md:gap-12">
          <AlertDialogCancel
            disabled={loading}
            onClick={() => handleExit(game!)}
          >
            Exit
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={() => {
              dispatch(hideAlert());
              onReset();
            }}
          >
            Rematch
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GameOver;
