import Image from "next/image";

export default function ProfileCard() {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <Image
            src="/assets/doc1.png"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
            width={96}
            height={96}
          />
          <div>
            <h2 className="text-2xl font-bold">Sarah Wilson</h2>
            <p className="text-gray-500">sarah.wilson@example.com</p>
            <p>Age: 32</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Street, City, Country</p>
          </div>
          <button className="ml-auto bg-black text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>
      </div>
    );
  }
  