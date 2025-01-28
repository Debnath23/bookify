import ProfileCard from '@/components/ProfileCard';
import UpcomingAppointments from '@/components/UpcomingAppointments';
import PastAppointments from '@/components/PastAppointments';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-14">
      <ProfileCard />
      <UpcomingAppointments />
      <PastAppointments />
    </div>
  );
}
