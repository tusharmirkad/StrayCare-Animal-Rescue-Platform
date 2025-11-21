import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { useUser } from "@clerk/clerk-react";

const NGOs = () => {
  const { isSignedIn } = useUser(); // FIXED hook

  const [search, setSearch] = useState("");

  const ngosList = [
    {
      name: "Welfare for Stray Dogs (WSD)",
      city: "Mumbai",
      phone: "+91 XXXXX XXXXX",
      email: "contact@wsd.org",
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/5732471/pexels-photo-5732471.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "RESQ Charitable Trust",
      city: "Pune",
      phone: "+91 XXXXX XXXXX",
      email: "info@resqct.org",
      rating: 4.9,
      image:
        "https://images.pexels.com/photos/7210501/pexels-photo-7210501.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Animal Aid Unlimited",
      city: "Udaipur",
      phone: "+91 XXXXX XXXXX",
      email: "help@animalaid.org",
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "People For Animals (PFA)",
      city: "Delhi",
      phone: "+91 XXXXX XXXXX",
      email: "support@pfa.org",
      rating: 4.6,
      image:
        "https://images.pexels.com/photos/5953654/pexels-photo-5953654.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const filteredNgos = ngosList.filter(
    (ngo) =>
      ngo.name.toLowerCase().includes(search.toLowerCase()) ||
      ngo.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* HERO APPLY SECTION */}
      <section className="bg-green-50 border-b-2 border-green-200 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Become a Partner NGO
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-8">
            Join hands with StrayCare to rescue, treat and protect stray
            animals. Together, we can save lives and build a safer community for
            animals.
          </p>

          <Link
            to={isSignedIn ? "/apply-ngo" : "/login?redirect=/apply-ngo"}
            className="bg-green-700 text-white px-10 py-4 rounded-lg text-lg shadow hover:bg-green-800 transition"
          >
            Apply as NGO
          </Link>

          <p className="text-gray-500 text-sm mt-4">
            Approval takes 24–48 hours by our verification team.
          </p>
        </div>
      </section>

      {/* NGO LIST SECTION */}
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
            Our Partner NGOs
          </h2>
          <p className="text-center max-w-2xl mx-auto text-gray-600 mb-10">
            These trusted partners actively rescue, shelter, and treat stray
            animals across India.
          </p>

          {/* Search Bar */}
          <div className="flex items-center max-w-lg mx-auto bg-white shadow p-3 rounded-lg mb-8 border">
            <FaSearch className="text-gray-500 text-xl mr-3" />
            <input
              type="text"
              placeholder="Search NGO by name or city..."
              className="w-full outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* NGO CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredNgos.map((ngo, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 border"
              >
                <img
                  src={ngo.image}
                  alt={ngo.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h3 className="text-xl font-bold text-gray-800">{ngo.name}</h3>

                <p className="flex items-center gap-2 text-gray-600 mt-2">
                  <FaMapMarkerAlt className="text-red-500" /> {ngo.city}
                </p>

                <p className="flex items-center gap-2 mt-2 text-yellow-600 font-semibold">
                  <FaStar /> {ngo.rating} / 5.0
                </p>

                <div className="my-4 border-t"></div>

                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center gap-2">
                    <FaPhoneAlt className="text-green-700" /> {ngo.phone}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-green-700" /> {ngo.email}
                  </p>
                </div>

                <div className="mt-5 flex gap-3">
                  <button className="flex-1 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition">
                    Call Now
                  </button>
                  <button className="flex-1 border border-green-700 text-green-700 py-2 rounded-md hover:bg-green-700 hover:text-white transition">
                    Email
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredNgos.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No NGOs found for “{search}”.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default NGOs;
