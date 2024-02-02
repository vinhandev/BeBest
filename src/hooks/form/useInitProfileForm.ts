import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import i18next from 'i18next';
import { useUserStore } from '~/stores';

const Schema = z.object({
  name: z.string().min(1),
  age: z.string().min(1),
  weight: z.number().min(1),
  height: z.number().min(1),
  water: z.number().min(1),
  goalWeight: z.number().min(1),
  goalHeight: z.number().min(1),
  mealPerDay: z.number().min(1),
  gender: z.enum(['MALE', 'FEMALE']),
});
export type FormData = z.infer<typeof Schema>;

export const useInitProfileForm = () => {
  const profile = useUserStore((state) => state.profile);
  const defaultValues: FormData = {
    name: profile?.name ?? '',
    age: `${profile?.age}` ?? '18',
    gender: profile?.gender ?? 'MALE',
    goalHeight: profile?.goalHeight ?? 0,
    goalWeight: profile?.goalWeight ?? 0,
    mealPerDay: profile?.mealPerDay ?? 3,
    height: profile?.height ?? 0,
    water: profile?.waterPerDay ?? 0,
    weight: profile?.weight ?? 0,
  };

  return useForm<FormData>({
    defaultValues,
    resolver: zodResolver(Schema),
  });
};
