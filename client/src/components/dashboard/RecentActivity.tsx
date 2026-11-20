import { div } from "framer-motion/client";
import Card from "../ui/Card";

interface ActivityItem {
  id: number;
  title: string;
  description: string;
  time: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card className='max-w-lg'>
      <div className='space-y-5'>
        {activities.length === 0 ? (
          <p className='text-center text-text-muted'>
            No recent activity available.
          </p>
        ) : (
          activities.map((activity) => (
              <div
                key={activity.id}
                className='border-b border-border pb-4 pt-2.5 last:border-none'>
                <h3 className='font-semibold text-text'>{activity.title}</h3>

                <p className='mt-1 text-sm text-text-muted'>
                  {activity.description}
                </p>

                <span className='mt-2 block text-xs text-text-muted'>
                  {activity.time}
                </span>
              </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default RecentActivity;
