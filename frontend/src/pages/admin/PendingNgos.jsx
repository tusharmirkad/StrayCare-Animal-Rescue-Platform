import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import useApi  from "../../utils/api";

const PendingNgos = () => {
  const api = useApi();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch pending NGOs
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await api.get("/admin/pending-ngos");
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching pending NGOs:", err);
      }
      setLoading(false);
    };

    fetchPending();
  }, []);

  const approveNgo = async (id) => {
    try {
      await api.post(`/admin/approve-ngo/${id}`);
      setApplications((prev) => prev.filter((a) => a._id !== id));
      alert("NGO approved successfully");
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  };

  const rejectNgo = async (id) => {
    try {
      await api.post(`/admin/reject-ngo/${id}`);
      setApplications((prev) => prev.filter((a) => a._id !== id));
      alert("NGO rejected");
    } catch (err) {
      console.error(err);
      alert("Rejection failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* -------- Mobile Blur Overlay -------- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* -------- Mobile Sidebar -------- */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 md:hidden`}
      >
        <AdminSidebar />
      </div>

      {/* -------- Desktop Sidebar -------- */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* -------- Page Content -------- */}
      <div className="flex-1 md:ml-64 p-4 sm:p-6">

        {/* Topbar */}
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        <h1 className="text-3xl font-bold text-green-700 mb-6 mt-4">
          Pending NGO Applications
        </h1>

        {loading ? (
          <p className="text-gray-600 text-center">Loading...</p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No pending NGO applications.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
            {applications.map((ngo) => (
              <div
                key={ngo._id}
                className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {ngo.name}
                </h2>

                <p><strong>Email:</strong> {ngo.email}</p>
                <p><strong>Phone:</strong> {ngo.phone}</p>
                <p><strong>City:</strong> {ngo.city}</p>

                <p className="my-2"><strong>Description:</strong> {ngo.description}</p>

                <a
                  href={ngo.documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Certificate/Document
                </a>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <button
                    onClick={() => approveNgo(ngo._id)}
                    className="flex-1 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectNgo(ngo._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                  >
                    Reject
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

export default PendingNgos;
