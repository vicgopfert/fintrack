import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const DatePickerWithRange = ({
  value,
  onChange,
  placeholder = 'Selecione uma data',
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-picker-range"
          className="cursor-pointer justify-start px-2.5 font-normal"
        >
          <CalendarIcon data-icon="inline-start" />

          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, 'dd MMM', { locale: ptBR })} -{' '}
                {format(value.to, 'dd MMM', { locale: ptBR })}
              </>
            ) : (
              format(value.from, 'dd MMM', { locale: ptBR })
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
};
