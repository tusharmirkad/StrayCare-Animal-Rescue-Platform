import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import useApi from "../utils/api";


const MyReports = () => {
  const api = useApi();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusColor = {
    Pending: "bg-yellow-500",
    Accepted: "bg-blue-500",
    Completed: "bg-green-600",
  };

  useEffect(() => {
    const fetchMyReports = async () => {
      try {
        const res = await api.get("/api/reports/me");
        setReports(res.data.data || []);
      } catch (err) {
        console.error("Fetch my reports error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReports();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            My Reports
          </h1>

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : reports.length === 0 ? (
            <p className="text-center text-gray-600">
              You haven’t submitted any reports yet.
            </p>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="p-3 border">Report ID</th>
                      <th className="p-3 border">Animal</th>
                      <th className="p-3 border">Status</th>
                      <th className="p-3 border">Severity</th>
                      <th className="p-3 border">Location</th>
                      <th className="p-3 border">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((r) => (
                      <tr key={r._id} className="text-center">
                        <td className="p-3 border">{r._id}</td>
                        <td className="p-3 border">{r.animalType}</td>
                        <td className="p-3 border">
                          <span
                            className={`px-3 py-1 rounded-md text-white text-sm ${statusColor[r.status]}`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3 border">{r.severity}</td>
                        <td className="p-3 border">
                          {r.location?.address || "N/A"}
                        </td>
                        <td className="p-3 border">
                          {new Date(r.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-6">
                {reports.map((r) => (
                  <div
                    key={r._id}
                    className="bg-white border rounded-lg p-4 shadow"
                  >
                    <p><b>Report ID:</b> {r._id}</p>
                    <p><b>Animal:</b> {r.animalType}</p>
                    <p>
                      <b>Status:</b>{" "}
                      <span
                        className={`px-2 py-1 rounded text-white ${statusColor[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </p>
                    <p><b>Severity:</b> {r.severity}</p>
                    <p><b>Location:</b> {r.location?.address || "N/A"}</p>
                    <p>
                      <b>Time:</b>{" "}
                      {new Date(r.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyReports;
