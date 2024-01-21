import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import i18next from 'i18next';

const Schema = z.object({
  time: z.date(),
  due: z.date(),
  type: z.string().min(1),
  description: z.string().min(1),
});
type FormData = z.infer<typeof Schema>;

export const useAddTask = () => {
  const defaultValues: FormData = {
    time: new Date(),
    due: new Date(),
    description: '',
    type: 'HABIT',
  };

  return useForm<FormData>({
    defaultValues,
    resolver: zodResolver(Schema),
  });
};
