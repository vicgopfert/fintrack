import { ExternalLinkIcon } from 'lucide-react';
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useEditTransactionForm } from '@/forms/hooks/use-transaction-form';

import { Button } from '..';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { DatePicker } from './date-picker';

const EditTransactionButton = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, control, reset, errors, isPending, onSubmit } =
    useEditTransactionForm({
      transaction,
      onSuccess: () => {
        setIsOpen(false);
      },
    });

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      reset();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <ExternalLinkIcon className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        <SheetTitle>Editar transação</SheetTitle>
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
            <SheetClose asChild>
              <Button
                type="button"
                size="lg"
                variant="secondary"
                disabled={isPending}
              >
                Cancelar
              </Button>
            </SheetClose>

            <Button type="submit" size="lg" disabled={isPending}>
              {isPending && <Spinner />}
              Salvar
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditTransactionButton;
