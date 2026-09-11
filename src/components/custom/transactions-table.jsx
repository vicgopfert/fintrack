import { useGetTransactions } from '@/api/hooks/use-transactions';

import { DataTable } from '../ui/data-table';

export const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
  },
  {
    accessorKey: 'date',
    header: 'Data',
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
  },
];

const TransactionsTable = () => {
  const { data: transactions } = useGetTransactions();
  return <DataTable columns={columns} data={transactions ?? []} />;
};

export default TransactionsTable;
