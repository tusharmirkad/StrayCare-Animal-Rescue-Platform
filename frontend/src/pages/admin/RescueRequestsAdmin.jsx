import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

const dummyRescueRequests = [
  {
    id: "REQ001",
    reporterName: "Amit Sharma",
    reporterPhone: "9876543210",
    animal: "Dog",
    severity: "High",
    location: "Andheri, Mumbai",
    image: "https://images.pexels.com/photos/5732471/pexels-photo-5732471.jpeg",
    status: "Pending",
    date: "2025-11-17",
  },
  {
    id: "REQ002",
    reporterName: "Priya Singh",
    reporterPhone: "9001234567",
    animal: "Cat",
    severity: "Medium",
    location: "Kothrud, Pune",
    image: "https://images.pexels.com/photos/7210501/pexels-photo-7210501.jpeg",
    status: "Pending",
    date: "2025-11-16",
  },
  {
    id: "REQ003",
    reporterName: "John Mathews",
    reporterPhone: "9912345678",
    animal: "Cow",
    severity: "Critical",
    location: "Udaipur City",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    status: "Pending",
    date: "2025-11-15",
  },
];

const RescueRequestsAdmin = () => {
  const [requests, setRequests] = useState(dummyRescueRequests);

  const verifyRequest = (id) => {
    alert(`Marked request ${id} as Verified`);
  };

  const rejectRequest = (id) => {
    if (window.confirm("Are you sure you want to reject this rescue report?")) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      alert("Rescue request rejected and removed.");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 ml-64 bg-gray-50 min-h-screen p-6">
        <AdminTopbar />

        <h1 className="text-3xl font-bold text-green-700 mt-4 mb-8">
          Rescue Requests
        </h1>

        {/* Rescue Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-xl shadow border hover:shadow-lg transition p-5"
            >
              <img
                src={req.image}
                alt="Animal"
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {req.animal} Rescue
              </h2>

              <p className="text-sm text-gray-500 mb-3">
                Reported on: {req.date}
              </p>

              <p>
                <strong>Severity:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    req.severity === "High"
                      ? "bg-orange-500"
                      : req.severity === "Critical"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {req.severity}
                </span>
              </p>

              <p className="mt-1">
                <strong>Location:</strong> {req.location}
              </p>

              <p className="mt-1">
                <strong>Reporter:</strong> {req.reporterName}
              </p>

              <p className="mt-1">
                <strong>Contact:</strong> {req.reporterPhone}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => verifyRequest(req.id)}
                  className="flex-1 bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
                >
                  Verify
                </button>

                <button
                  onClick={() => rejectRequest(req.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10">
            No rescue requests pending.
          </p>
        )}
      </div>
    </div>
  );
};

export default RescueRequestsAdmin;
