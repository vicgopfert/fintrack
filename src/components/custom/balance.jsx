import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react';

import { useBalance } from '@/hooks/data/use-balance';

import BalanceItem from './balance-item';

const Balance = () => {
  const { data: financialData } = useBalance();

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label="Saldo"
        icon={<WalletIcon size={16} />}
        amount={financialData?.balance ?? 0}
      />
      <BalanceItem
        label="Ganhos"
        icon={<TrendingUpIcon className="text-primary-green" size={16} />}
        amount={financialData?.earnings ?? 0}
      />
      <BalanceItem
        label="Gastos"
        icon={<TrendingDownIcon className="text-primary-red" size={16} />}
        amount={financialData?.expenses ?? 0}
      />
      <BalanceItem
        label="Investimentos"
        icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
        amount={financialData?.investments ?? 0}
      />
    </div>
  );
};

export default Balance;
