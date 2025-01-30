import ProfileCard from "@/components/ProfileCard";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import PastAppointments from "@/components/PastAppointments";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="py-4">
        <Link
          href="/"
          className="font-bold text-3xl bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
        >
          Bookify
        </Link>
      </div>
      <ProfileCard />
      <UpcomingAppointments />
      <PastAppointments />
    </div>
  );
}
