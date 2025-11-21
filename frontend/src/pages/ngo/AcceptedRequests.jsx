import React from "react";
import NgoSidebar from "../../components/ngo/NgoSidebar";
import NgoTopbar from "../../components/ngo/NgoTopbar";
import { acceptedRequests } from "../../data/ngoRequests";

const AcceptedRequests = () => {
  return (
    <div className="flex">
      <NgoSidebar />

      <div className="flex-1 bg-gray-50 p-4 min-h-screen">
        <NgoTopbar />

        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Accepted Requests
        </h1>

        {acceptedRequests.length === 0 ? (
          <p className="text-gray-600">No accepted requests yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {acceptedRequests.map((r) => (
              <div
                key={r.id}
                className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
              >
                {/* Image */}
                <img
                  src={r.photo}
                  alt={r.animal}
                  className="w-full h-48 object-cover rounded-md"
                />

                {/* Animal Name */}
                <h2 className="text-xl font-bold mt-3">{r.animal}</h2>

                {/* Severity */}
                <p>
                  <strong>Severity:</strong>{" "}
                  <span
                    className={
                      r.severity === "High"
                        ? "text-red-600"
                        : r.severity === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  >
                    {r.severity}
                  </span>
                </p>

                {/* Location */}
                <p>
                  <strong>Location:</strong> {r.location}
                </p>

                {/* Volunteer Assigned */}
                <p>
                  <strong>Assigned To:</strong> {r.assignedTo}
                </p>

                {/* Current Status */}
                <p>
                  <strong>Status:</strong> {r.status}
                </p>

                {/* Time */}
                <p className="text-gray-500 text-sm mt-1">{r.time}</p>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Update Status
                  </button>

                  <button className="flex-1 bg-green-700 text-white py-2 rounded-md hover:bg-green-800">
                    Mark Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptedRequests;
