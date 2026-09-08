import z from 'zod';

export const createTransactionFormSchema = z.object({
  name: z.string().trim().min(1, 'O nome é obrigatório.'),
  amount: z
    .number('O valor deve ser um número.')
    .positive('O valor deve ser maior que zero.'),
  date: z.date('A data é obrigatória.'),
  type: z.enum(
    ['EARNING', 'EXPENSE', 'INVESTMENT'],
    'Selecione um tipo válido.'
  ),
});
