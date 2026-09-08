import z from 'zod';

export const registerFormSchema = z
  .object({
    firstName: z.string().trim().min(1, 'O nome é obrigatório'),
    lastName: z.string().trim().min(1, 'O sobrenome é obrigatório'),
    email: z.email('E-mail inválido'),
    password: z
      .string()
      .trim()
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z
      .string()
      .trim()
      .min(6, 'A confirmação de senha é obrigatória'),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Você deve aceitar os termos de serviço',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
