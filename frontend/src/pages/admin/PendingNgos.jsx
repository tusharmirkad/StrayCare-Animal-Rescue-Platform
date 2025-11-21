import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

const dummyApplications = [
  {
    id: "NGO001",
    ngoName: "Happy Paws Foundation",
    email: "contact@happypaws.org",
    phone: "9876543210",
    city: "Mumbai",
    description: "We rescue and treat stray dogs and cats.",
    documentUrl: "https://www.africau.edu/images/default/sample.pdf",
    date: "2025-11-19",
  },
  {
    id: "NGO002",
    ngoName: "Stray Animals Trust",
    email: "help@strayanimals.org",
    phone: "9123456789",
    city: "Pune",
    description: "NGO focusing on medical treatment and vaccinations.",
    documentUrl: "https://www.africau.edu/images/default/sample.pdf",
    date: "2025-11-18",
  },
];

const PendingNgos = () => {
  const [applications, setApplications] = useState(dummyApplications);

  const approveNgo = (id) => {
    alert(`NGO ${id} approved! (Integrate Clerk role update here)`);
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const rejectNgo = (id) => {
    alert(`NGO ${id} rejected.`);
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 bg-gray-50 min-h-screen p-6">
        {/* Topbar */}
        <AdminTopbar />

        <h1 className="text-3xl font-bold text-green-700 mb-8 mt-4">
          Pending NGO Applications
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {applications.map((ngo) => (
            <div key={ngo.id} className="bg-white p-6 rounded-xl shadow border">
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
              <p className="my-2">
                <strong>Description:</strong> {ngo.description}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Applied on: {ngo.date}
              </p>

              <a
                href={ngo.documentUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Certificate/Document
              </a>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => approveNgo(ngo.id)}
                  className="flex-1 bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectNgo(ngo.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {applications.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No pending NGO applications.
          </p>
        )}
      </div>
    </div>
  );
};

export default PendingNgos;
