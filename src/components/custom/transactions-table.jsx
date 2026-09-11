import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useGetTransactions } from '@/api/hooks/use-transactions';
import { formatCurrency } from '@/helpers/currency';

import { DataTable } from '../ui/data-table';
import TransactionTypeBadge from './transaction-type-badge';

export const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />;
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount);
    },
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
