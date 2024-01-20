import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import i18next from 'i18next';

const Schema = z.object({
  name: z.string().min(1),
  age: z.string().min(1),
  weight: z.number().min(1),
  height: z.number().min(1),
  water: z.number().min(1),
  goal: z.number().min(1),
  gender: z.enum(['MALE', 'FEMALE']),
});
export type FormData = z.infer<typeof Schema>;

export const useInitProfileForm = () => {
  const defaultValues: FormData = {
    name: '',
    age: '',
    gender: 'MALE',
    goal: 0,
    height: 0,
    water: 0,
    weight: 0,
  };

  return useForm<FormData>({
    defaultValues,
    resolver: zodResolver(Schema),
  });
};
