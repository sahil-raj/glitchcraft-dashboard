import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<any>;
  color: string;
}

export function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <Card className="p-6 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255)]">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </Card>
  );
}