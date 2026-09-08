import {
  PiggyBankIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useCreateTransactionForm } from '@/forms/hooks/transaction';

import { DatePicker } from './date-picker';

const AddTransactionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { handleSubmit, control, reset, errors, isPending, onSubmit } =
    useCreateTransactionForm({ onSuccess: () => setIsOpen(false) });

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <PlusIcon />
          Nova transação
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar transação</DialogTitle>

          <DialogDescription>Insira as informações abaixo.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="name">Nome</FieldLabel>

            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  placeholder="Salário, aluguel, mercado…"
                  autoComplete="off"
                  aria-invalid={!!errors.name}
                />
              )}
            />

            <FieldError>{errors.name?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="amount">Valor</FieldLabel>

            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <NumericFormat
                  id="amount"
                  name={field.name}
                  value={field.value ?? ''}
                  onBlur={field.onBlur}
                  getInputRef={field.ref}
                  placeholder="R$ 0,00"
                  prefix="R$ "
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  allowNegative={false}
                  customInput={Input}
                  onValueChange={(values, sourceInfo) => {
                    if (sourceInfo.source !== 'event') return;
                    field.onChange(values.floatValue);
                  }}
                />
              )}
            />

            <FieldError>{errors.amount?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="date">Data</FieldLabel>

            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker value={field.value} onChange={field.onChange} />
              )}
            />

            <FieldError>{errors.date?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel id="type-label">Tipo</FieldLabel>

            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <div
                  className="grid grid-cols-3 gap-4"
                  role="group"
                  aria-labelledby="type-label"
                >
                  <Button
                    type="button"
                    size="lg"
                    variant={field.value === 'EARNING' ? 'selected' : 'outline'}
                    onClick={() => field.onChange('EARNING')}
                  >
                    <TrendingUpIcon className="text-primary-green" />
                    Ganho
                  </Button>

                  <Button
                    type="button"
                    size="lg"
                    variant={field.value === 'EXPENSE' ? 'selected' : 'outline'}
                    onClick={() => field.onChange('EXPENSE')}
                  >
                    <TrendingDownIcon className="text-primary-red" />
                    Gasto
                  </Button>

                  <Button
                    type="button"
                    size="lg"
                    variant={
                      field.value === 'INVESTMENT' ? 'selected' : 'outline'
                    }
                    onClick={() => field.onChange('INVESTMENT')}
                  >
                    <PiggyBankIcon className="text-primary-blue" />
                    Invest.
                  </Button>
                </div>
              )}
            />

            <FieldError>{errors.type?.message}</FieldError>
          </Field>

          <div className="grid grid-cols-2 gap-6">
            <DialogClose asChild>
              <Button
                type="button"
                size="lg"
                variant="secondary"
                disabled={isPending}
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" size="lg" disabled={isPending}>
              {isPending && <Spinner />}
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
