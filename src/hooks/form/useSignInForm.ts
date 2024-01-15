import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});
export type SignInSchemaType = z.infer<typeof SignInSchema>;
export type SignInSchemaKeys = keyof SignInSchemaType;

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
