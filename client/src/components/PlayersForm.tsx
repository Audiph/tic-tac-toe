import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormInput, formSchema } from '@/lib/constants';
import { forwardRef, useImperativeHandle } from 'react';
import { PlayersFormHandle, PlayersFormProps } from '@/lib/constants';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Loading from './ui/loading';

const PlayersForm = forwardRef<PlayersFormHandle, PlayersFormProps>(
  ({ onSubmit }, ref) => {
    const { loading } = useSelector((state: RootState) => state.util);
    const form = useForm<FormInput>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        playerOne: '',
        playerTwo: '',
      },
    });

    useImperativeHandle(ref, () => ({
      submitForm: () => form.handleSubmit(onSubmit)(),
    }));

    return (
      <Form {...form}>
        {loading ? (
          <Loading size="10" />
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="playerOne"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player 1</FormLabel>
                  <FormControl>
                    <Input placeholder="One" {...field} />
                  </FormControl>
                  <FormDescription>Playing 'X'</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="playerTwo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Two" {...field} />
                  </FormControl>
                  <FormDescription>Playing 'O'</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        )}
      </Form>
    );
  }
);

export default PlayersForm;
