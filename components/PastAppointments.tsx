export default function PastAppointments() {
    const appointments = [
      {
        id: 1,
        name: 'Dr. Michael Brown',
        specialty: 'Pediatrician',
        time: 'Last Week',
        status: 'Completed',
      },
      {
        id: 2,
        name: 'Dr. Emily Davis',
        specialty: 'Neurologist',
        time: '2 Weeks Ago',
        status: 'Completed',
      },
    ];
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-xl font-bold mb-4">Past Appointments</h3>
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0"
          >
            <div className="flex items-center space-x-4">
              <img
                src="/assets/doc1.png"
                alt={appt.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="text-lg font-semibold">{appt.name}</h4>
                <p className="text-sm text-gray-500">{appt.specialty}</p>
                <p className="text-sm text-gray-500">{appt.time}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              View Details
            </button>
          </div>
        ))}
      </div>
    );
  }
  