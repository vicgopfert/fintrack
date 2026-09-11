import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ExternalLinkIcon } from 'lucide-react';

import { useGetTransactions } from '@/api/hooks/use-transactions';
import { formatCurrency } from '@/helpers/currency';

import { Button } from '..';
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
    cell: () => {
      return (
        <Button variant="ghost" size="icon">
          <ExternalLinkIcon className="text-muted-foreground" />
        </Button>
      );
    },
  },
];

const TransactionsTable = () => {
  const { data: transactions } = useGetTransactions();
  return <DataTable columns={columns} data={transactions ?? []} />;
};

export default TransactionsTable;
