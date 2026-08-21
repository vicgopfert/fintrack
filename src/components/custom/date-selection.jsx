import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { DatePickerWithRange } from './date-picker-with-range';

const formatDateToQueryParam = (date) => format(date, 'yyyy-MM-dd');

const parseDateFromQueryParam = (value) => {
  if (!value) return null;

  const parsed = new Date(`${value}T00:00:00`);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const DateSelection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [date, setDate] = useState(() => ({
    from: parseDateFromQueryParam(searchParams.get('from')) ?? new Date(),
    to: parseDateFromQueryParam(searchParams.get('to')) ?? new Date(),
  }));

  useEffect(() => {
    if (!date?.from || !date?.to) return;

    const queryParams = new URLSearchParams();
    queryParams.set('from', formatDateToQueryParam(date.from));
    queryParams.set('to', formatDateToQueryParam(date.to));

    navigate({ search: queryParams.toString() }, { replace: true });
  }, [navigate, date]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
