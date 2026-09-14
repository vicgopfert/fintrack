import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useGetTransactions } from '@/api/hooks/use-transactions';
import { formatCurrency } from '@/helpers/currency';

import { DataTable } from '../ui/data-table';
import { ScrollArea } from '../ui/scroll-area';
import EditTransactionButton from './edit-transaction-button';
import TransactionTypeBadge from './transaction-type-badge';

export const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
    meta: { className: 'font-medium text-foreground' },
    cell: ({ row: { original: transaction } }) => transaction.name,
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
    meta: { className: 'text-muted-foreground' },
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    meta: { className: 'text-right font-medium tabular-nums' },
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount);
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    meta: { className: 'w-0 text-right' },
    cell: ({ row: { original: transaction } }) => {
      return <EditTransactionButton transaction={transaction} />;
    },
  },
];

const TransactionsTable = () => {
  const { data: transactions } = useGetTransactions();

  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="px-4 py-4">
        <h2 className="text-base font-bold">Transações</h2>
      </div>

      <ScrollArea viewportClassName="max-h-125">
        <DataTable columns={columns} data={transactions ?? []} />
      </ScrollArea>
    </div>
  );
};

export default TransactionsTable;
