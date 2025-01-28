export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <img
            src="/assets/doc1.png"
            alt="Dr. John Smith"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-lg font-semibold">Dr. John Smith</h1>
            <p className="text-gray-600">Cardiologist</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-yellow-500 text-xl font-bold">⭐ 4.8</p>
          <p className="text-sm text-gray-600">(120 reviews)</p>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Write a Review</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Rating</label>
          <div className="flex space-x-1 text-yellow-500 text-xl">
            <span>⭐</span> <span>⭐</span> <span>⭐</span>{" "}
            <span className="text-gray-300">☆</span>{" "}
            <span className="text-gray-300">☆</span>
          </div>
        </div>
        <textarea
          placeholder="Write your experience with the doctor..."
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Wait Time</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option>Less than 15 minutes</option>
              <option>15-30 minutes</option>
              <option>30+ minutes</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Bedside Manner</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option>Excellent</option>
              <option>Good</option>
              <option>Average</option>
              <option>Poor</option>
            </select>
          </div>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Submit Review
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-6 shadow-sm">
        <div className="text-center">
          <p className="text-lg font-bold">4.8</p>
          <p className="text-sm text-gray-600">Overall Rating</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">95%</p>
          <p className="text-sm text-gray-600">Would Recommend</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">10m</p>
          <p className="text-sm text-gray-600">Avg Wait Time</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">120</p>
          <p className="text-sm text-gray-600">Total Reviews</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <div className="mb-4">
          <p className="font-semibold">
            Sarah Wilson <span className="text-yellow-500">⭐ 5.0</span>
          </p>
          <p className="text-gray-600 text-sm">
            Excellent doctor! Very thorough and patient in explaining
            everything. The wait time was minimal, and the staff was very
            professional.
          </p>
        </div>
      </div>
    </div>
  );
}
