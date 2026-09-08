import z from 'zod';

export const loginFormSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().trim().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});
