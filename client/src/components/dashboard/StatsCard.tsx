import Card from "../ui/Card";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <Card className='flex items-center gap-4'>
      <div className='flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary'>
        {icon}
      </div>

      <div>
        <h3 className=' text-3xl font-bold text-text'>{value}</h3>
        <p className='text-sm text-text-muted'>{title}</p>
      </div>
    </Card>
  );
};

export default StatsCard;
