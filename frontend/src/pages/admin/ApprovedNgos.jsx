import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

const dummyApprovedNGOs = [
  {
    id: "APPROVED001",
    ngoName: "Happy Paws Foundation",
    email: "contact@happypaws.org",
    phone: "9876543210",
    city: "Mumbai",
    description: "We rescue and treat stray animals across Mumbai.",
    approvedDate: "2025-11-01",
  },
  {
    id: "APPROVED002",
    ngoName: "Stray Animals Trust",
    email: "help@strayanimals.org",
    phone: "9123456789",
    city: "Pune",
    description: "Providing medical treatment and vaccinations for strays.",
    approvedDate: "2025-10-25",
  },
];

const ApprovedNgos = () => {
  const [ngos, setNgos] = useState(dummyApprovedNGOs);

  const removeNgo = (id) => {
    if (window.confirm("Are you sure you want to remove this NGO?")) {
      setNgos((prev) => prev.filter((ngo) => ngo.id !== id));
      alert("NGO removed successfully.");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 ml-64 bg-gray-50 min-h-screen p-6">
        <AdminTopbar />

        <h1 className="text-3xl font-bold text-green-700 mt-4 mb-8">
          Approved NGOs
        </h1>

        {/* NGO Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {ngos.map((ngo) => (
            <div
              key={ngo.id}
              className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {ngo.ngoName}
              </h2>

              <p>
                <strong>Email:</strong> {ngo.email}
              </p>
              <p>
                <strong>Phone:</strong> {ngo.phone}
              </p>
              <p>
                <strong>City:</strong> {ngo.city}
              </p>

              <p className="my-2 text-gray-700">
                <strong>About:</strong> {ngo.description}
              </p>

              <p className="text-sm text-gray-500 mb-2">
                Approved on: {ngo.approvedDate}
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => alert("Show NGO full details page (future)")}
                >
                  View Details
                </button>

                <button
                  onClick={() => removeNgo(ngo.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No NGOs */}
        {ngos.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10">
            No approved NGOs yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ApprovedNgos;
