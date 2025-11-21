import React from "react";
import NgoSidebar from "../../components/ngo/NgoSidebar";
import NgoTopbar from "../../components/ngo/NgoTopbar";
import { completedRequests } from "../../data/ngoRequests";

const CompletedRequests = () => {
  return (
    <div className="flex">
      <NgoSidebar />

      <div className="flex-1 bg-gray-50 min-h-screen p-4">
        <NgoTopbar />

        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Completed Rescues
        </h1>

        {completedRequests.length === 0 ? (
          <p className="text-gray-600">No completed rescues yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedRequests.map((r) => (
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
                    {r.severity || "Unknown"}
                  </span>
                </p>

                {/* Location */}
                <p>
                  <strong>Location:</strong> {r.location}
                </p>

                {/* Treatment */}
                <p>
                  <strong>Treatment:</strong> {r.treatment}
                </p>

                {/* Completed By */}
                <p>
                  <strong>Completed By:</strong> {r.completedBy}
                </p>

                {/* Time */}
                <p className="text-gray-500 text-sm mt-1">{r.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedRequests;
