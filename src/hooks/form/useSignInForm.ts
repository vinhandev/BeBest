import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import i18next from 'i18next';

const SignInSchema = z.object({
  email: z
    .string({
      required_error: i18next.t('error:email_required'),
    })
    .email(i18next.t('error:email_invalid')),
  password: z.string().min(3, i18next.t('error:password_required')),
});
export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const useSignInForm = () => {
  const defaultValues: SignInSchemaType = {
    email: '',
    password: '',
  };

  return useForm<SignInSchemaType>({
    defaultValues,
    resolver: zodResolver(SignInSchema),
  });
};
