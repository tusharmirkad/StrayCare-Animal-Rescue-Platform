// import React from "react";
// import NgoSidebar from "../../components/ngo/NgoSidebar";
// import NgoTopbar from "../../components/ngo/NgoTopbar";
// import { pendingRequests } from "../../data/ngoRequests";

// const PendingRequests = () => {
//   return (
//     <div className="flex">
//       <NgoSidebar />

//       <div className="flex-1 bg-gray-50 p-4 min-h-screen">
//         <NgoTopbar />

//         <h1 className="text-3xl font-bold text-green-700 mb-6">
//           Pending Requests
//         </h1>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {pendingRequests.map((r) => (
//             <div
//               key={r.id}
//               className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
//             >
//               {/* Image */}
//               <img
//                 src={r.photo}
//                 className="w-full h-48 object-cover rounded-md"
//                 alt={r.animal}
//               />

//               {/* Animal Name */}
//               <h2 className="text-xl font-bold mt-3">{r.animal}</h2>

//               {/* Severity */}
//               <p>
//                 <strong>Severity:</strong>{" "}
//                 <span
//                   className={
//                     r.severity === "High"
//                       ? "text-red-600"
//                       : r.severity === "Medium"
//                       ? "text-yellow-600"
//                       : "text-green-600"
//                   }
//                 >
//                   {r.severity}
//                 </span>
//               </p>

//               {/* Location */}
//               <p>
//                 <strong>Location:</strong> {r.location}
//               </p>

//               {/* Reporter */}
//               <p>
//                 <strong>Reporter:</strong> {r.reporterName}
//               </p>

//               {/* Phone */}
//               <p>
//                 <strong>Phone:</strong> {r.reporterPhone}
//               </p>

//               {/* Time */}
//               <p className="text-gray-500 text-sm mt-1">{r.time}</p>

//               {/* Buttons */}
//               <div className="flex gap-3 mt-4">
//                 <button onClick={() => alert("Hello")} className="flex-1 bg-green-700 text-white py-2 rounded-md hover:bg-green-800">
//                   Accept
//                 </button>
//                 <button className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PendingRequests;
import React, { useEffect, useState } from "react";
import NgoSidebar from "../../components/ngo/NgoSidebar";
import NgoTopbar from "../../components/ngo/NgoTopbar";
import useApi from "../../utils/api";

const PendingRequests = () => {
  const api = useApi(); // ✅ IMPORTANT
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await api.get("/api/ngo/requests/pending"); // ✅ FULL PATH
        console.log("PENDING RESPONSE:", res.data);
        setRequests(res.data || []);
      } catch (error) {
        console.error("Fetch pending error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  const handleAccept = async (id) => {
    try {
      await api.put(`/api/ngo/requests/accept/${id}`);

      // ✅ REMOVE accepted request from UI instantly
      setRequests(prev => prev.filter(r => r._id !== id))

    } catch (error) {
      console.error("Accept failed:", error);
    }
  };

  return (
    <div className="flex">
      <NgoSidebar />
      <div className="flex-1 bg-gray-50 p-4 min-h-screen">
        <NgoTopbar />

        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Pending Requests
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : requests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((r) => (
              <div key={r._id} className="bg-white shadow rounded-lg p-4">
                <img
                  src={`http://localhost:5000${r.imageUrl}`}
                  className="w-full h-48 object-cover rounded-md"
                />

                <h2 className="text-xl font-bold mt-3">{r.animalType}</h2>

                <p>
                  <b>Severity:</b> {r.severity}
                </p>
                <p>
                  <b>Location:</b> {r.location?.address || "N/A"}
                </p>
                <p>
                  <b>Reporter:</b> {r.reporterEmail}
                </p>

                <button
                  onClick={() => handleAccept(r._id)}
                  className="mt-3 w-full bg-green-700 text-white py-2 rounded cursor-pointer"
                >
                  Accept
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingRequests;
