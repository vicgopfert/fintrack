import { PlusIcon } from 'lucide-react';

import { Button, Header } from '@/components';
import Balance from '@/components/custom/balance';
import DateSelection from '@/components/custom/date-selection';

const HomePage = () => {
  return (
    <>
      <Header />

      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>

          <div className="flex items-center gap-2">
            <DateSelection />
            <Button className="cursor-pointer">
              <PlusIcon />
              Nova transação
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1fr]">
          <Balance />
        </div>
      </div>
    </>
  );
};

export default HomePage;
