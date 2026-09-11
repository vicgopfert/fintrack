import { cva } from 'class-variance-authority';
import { CircleIcon } from 'lucide-react';

const badgeVariants = cva(
  'flex w-fit items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-xs font-bold',
  {
    variants: {
      variant: {
        earning: 'text-primary-green fill-primary-green',
        expense: 'text-primary-red fill-primary-red',
        investment: 'text-primary-blue fill-primary-blue',
      },
    },
  }
);

const TransactionTypeBadge = ({ variant }) => {
  return (
    <div className={badgeVariants({ variant })}>
      <CircleIcon className="fill-inherit" size={10} />
      {variant === 'earning' && 'Ganho'}
      {variant === 'expense' && 'Gasto'}
      {variant === 'investment' && 'Investimento'}
    </div>
  );
};

export default TransactionTypeBadge;
