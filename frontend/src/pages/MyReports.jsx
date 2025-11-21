import React, { useState } from "react";
import Navbar from "../components/navbar";

const MyReports = () => {
  const [reports] = useState([
    {
      id: "RC1023",
      animal: "Dog",
      status: "Pending",
      severity: "High",
      location: "Mumbai, Maharashtra",
      timestamp: "2025-04-10 14:25",
    },
    {
      id: "RC1024",
      animal: "Cat",
      status: "Accepted",
      severity: "Medium",
      location: "Pune, Maharashtra",
      timestamp: "2025-04-11 10:15",
    },
    {
      id: "RC1025",
      animal: "Cow",
      status: "Completed",
      severity: "High",
      location: "Nagpur, Maharashtra",
      timestamp: "2025-04-12 09:00",
    },
  ]);

  const statusColor = {
    Pending: "bg-yellow-500",
    Accepted: "bg-blue-500",
    "In Progress": "bg-orange-500",
    Completed: "bg-green-600",
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            My Reports
          </h1>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="p-3 border border-gray-300">Report ID</th>
                  <th className="p-3 border border-gray-300">Animal</th>
                  <th className="p-3 border border-gray-300">Status</th>
                  <th className="p-3 border border-gray-300">Severity</th>
                  <th className="p-3 border border-gray-300">Location</th>
                  <th className="p-3 border border-gray-300">Time</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((r) => (
                  <tr key={r.id} className="text-center">
                    <td className="p-3 border border-gray-300">{r.id}</td>
                    <td className="p-3 border border-gray-300">{r.animal}</td>

                    <td className="p-3 border border-gray-300">
                      <span
                        className={`px-3 py-1 rounded-md text-white text-sm ${
                          statusColor[r.status]
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="p-3 border border-gray-300">{r.severity}</td>
                    <td className="p-3 border border-gray-300">{r.location}</td>
                    <td className="p-3 border border-gray-300">
                      {r.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Responsive Cards */}
          <div className="md:hidden space-y-6">
            {reports.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow"
              >
                <p>
                  <strong>Report ID:</strong> {r.id}
                </p>
                <p>
                  <strong>Animal:</strong> {r.animal}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-3 py-1 rounded-md text-white ${
                      statusColor[r.status]
                    }`}
                  >
                    {r.status}
                  </span>
                </p>
                <p>
                  <strong>Severity:</strong> {r.severity}
                </p>
                <p>
                  <strong>Location:</strong> {r.location}
                </p>
                <p>
                  <strong>Time:</strong> {r.timestamp}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReports;
