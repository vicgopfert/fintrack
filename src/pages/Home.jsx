import { PlusIcon } from 'lucide-react';

import { Button, Header } from '@/components';
import DateSelection from '@/components/custom/date-selection';

const HomePage = () => {
  return (
    <>
      <Header />

      <div className="p-8">
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
      </div>
    </>
  );
};

export default HomePage;
