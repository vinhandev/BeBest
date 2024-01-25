import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import i18next from 'i18next';
import { today } from '~/constants';

const Schema = z.object({
  dueTime: z.date(),
  dueDate: z.date(),
  type: z.string().min(1),
  description: z.string().min(1),
});
type FormData = z.infer<typeof Schema>;

export const useAddTask = () => {
  const defaultValues: FormData = {
    dueTime: today,
    dueDate: today,
    description: '',
    type: 'HABIT',
  };

  return useForm<FormData>({
    defaultValues,
    resolver: zodResolver(Schema),
  });
};
