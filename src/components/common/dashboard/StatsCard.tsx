import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/redux/appStore';
import { Activity, LockIcon, LucideIcon } from 'lucide-react';
import { formatNumberToPrice } from '@/utils/helper/formatter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardCardOneProps {
  title: string;
  value: number;
  icon: LucideIcon;
  price?: boolean;
  isShow?: boolean;
}

const StatsCard: React.FC<DashboardCardOneProps> = ({ title, value, icon: Icon, price, isShow }) => {

  const themeMode = useSelector((store: RootState) => store.app.lightTheme);

  return (
    <Card className='relative'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='text-lg font-medium'>
          {title}
        </CardTitle>
        {Icon ? <Icon size={24} /> : <Activity size={24} />}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{price ? formatNumberToPrice(value as number) : value}</div>
      </CardContent>
      {!isShow && (
        <div className={`absolute inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl ${themeMode ? "bg-white/70" : "bg-black/70"}`}>
          <div className="text-center">
            <LockIcon className="mx-auto mb-2" size={20} />
            <span className="text-sm font-medium">No Access</span>
          </div>
        </div>
      )}
    </Card>
  )
}

export default StatsCard;


