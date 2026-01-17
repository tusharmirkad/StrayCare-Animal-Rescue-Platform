import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import useApi from "../../utils/api";


const RescueRequestsAdmin = () => {

  const api = useApi();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ---------------- FETCH ALL RESCUE REQUESTS ----------------
  useEffect(() => {
    const loadRequests = async () => {
      try {
        const res = await api.get("/api/admin/rescue-requests");
        setRequests(res.data);
      } catch (err) {
        console.error("Error loading rescue requests:", err);
      }
      setLoading(false);
    };

    loadRequests();
  }, []);

  // ---------------- VERIFY REQUEST ----------------
  const verifyRequest = async (id) => {
    try {
      await api.patch(`/rescue/${id}/status`, {
        status: "verified",
      });

      alert("Request marked as Verified");
    } catch (err) {
      console.error(err);
      alert("Verification failed");
    }
  };

  // ---------------- REJECT REQUEST ----------------
  const rejectRequest = async (id) => {
    if (!window.confirm("Reject this rescue report?")) return;

    try {
      await api.patch(`/api/rescue/${id}/status`, {
        status: "rejected",
      });

      setRequests((prev) => prev.filter((r) => r._id !== id));
      alert("Request rejected");
    } catch (err) {
      console.error(err);
      alert("Error rejecting request");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ---------- MOBILE OVERLAY BLUR ---------- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ---------- MOBILE SIDEBAR ---------- */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 md:hidden`}
      >
        <AdminSidebar />
      </div>

      {/* ---------- DESKTOP SIDEBAR ---------- */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* ---------- PAGE CONTENT ---------- */}
      <div className="flex-1 md:ml-64 p-4 sm:p-6">

        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        <h1 className="text-3xl font-bold text-green-700 mt-4 mb-8">
          Rescue Requests
        </h1>

        {loading ? (
          <p className="text-gray-600 text-center">Loading rescue requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No rescue requests found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-xl shadow border hover:shadow-lg transition p-5"
              >
                {/* IMAGE */}
                <img
                  src={req.reportId?.imageUrl}
                  alt="Animal"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />

                {/* INFO */}
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {req.reportId?.animalType || "Animal"} Rescue
                </h2>

                <p className="text-sm text-gray-500 mb-3">
                  Reported: {new Date(req.reportId?.createdAt).toLocaleDateString()}
                </p>

                <p>
                  <strong>Severity:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      req.reportId?.severity === "High"
                        ? "bg-orange-500"
                        : req.reportId?.severity === "Critical"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {req.reportId?.severity}
                  </span>
                </p>

                <p className="mt-1">
                  <strong>Location:</strong> {req.reportId?.location?.address}
                </p>

                <p className="mt-1">
                  <strong>Reporter:</strong> {req.reportId?.reporterName}
                </p>

                <p className="mt-1">
                  <strong>Contact:</strong> {req.reportId?.reporterEmail}
                </p>

                {/* BUTTONS */}
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => verifyRequest(req._id)}
                    className="flex-1 bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
                  >
                    Verify
                  </button>

                  <button
                    onClick={() => rejectRequest(req._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
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

export default RescueRequestsAdmin;
