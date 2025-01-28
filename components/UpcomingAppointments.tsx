import Image from "next/image";

export default function UpcomingAppointments() {
    const appointments = [
      {
        id: 1,
        name: 'Dr. John Smith',
        specialty: 'Cardiologist',
        time: 'Tomorrow, 10:00 AM',
        location: '123 Medical Center, New York',
        status: 'Pay Now',
      },
      {
        id: 2,
        name: 'Dr. Sarah Johnson',
        specialty: 'Dermatologist',
        time: 'Next Week, 2:00 PM',
        location: '456 Skin Clinic, Chicago',
        status: 'Paid',
      },
    ];
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-xl font-bold mb-4">Upcoming Appointments</h3>
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0"
          >
            <div className="flex items-center space-x-4">
              <Image
                src="/assets/doc1.png"
                alt={appt.name}
                className="w-16 h-16 rounded-full object-cover"
                width={64}
                height={64}
              />
              <div>
                <h4 className="text-lg font-semibold">{appt.name}</h4>
                <p className="text-sm text-gray-500">{appt.specialty}</p>
                <p className="text-sm text-gray-500">{appt.time}</p>
                <p className="text-sm text-gray-500">{appt.location}</p>
              </div>
            </div>
            <button
              className={`px-4 py-2 rounded ${
                appt.status === 'Pay Now'
                  ? 'bg-black text-white'
                  : 'bg-green-500 text-white'
              }`}
            >
              {appt.status}
            </button>
          </div>
        ))}
      </div>
    );
  }
  