import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../../components/navbar";
import useApi from "../../utils/api";
import { useNavigate } from "react-router-dom";


const ApplyNgo = () => {
  const api = useApi();
  const navigate = useNavigate();

  const { user } = useUser(); // <-- FIXED hook location

  const [form, setForm] = useState({
    ngoName: "",
    phone: "",
    city: "",
    address: "",
    description: "",
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const fd = new FormData();
    fd.append("ngoName", form.ngoName);
    fd.append("phone", form.phone);
    fd.append("city", form.city);
    fd.append("address", form.address);
    fd.append("description", form.description);

    if (form.document) {
      fd.append("document", form.document);
    }

    await api.post("/ngo/apply", fd);

    alert("Your NGO application has been submitted successfully!");

    // reset form
    setForm({
      ngoName: "",
      phone: "",
      city: "",
      address: "",
      description: "",
      document: null,
    });

    navigate("/ngo/pending-approval", { replace: true });

  } catch (error) {
    console.error("Apply NGO error:", error);
    alert(
      error.response?.data?.message || "Failed to submit NGO application"
    );
  }
};


  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Apply as Partner NGO
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Fill the form below to join StrayCare as an NGO partner.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold">NGO Name</label>
            <input
              type="text"
              name="ngoName"
              value={form.ngoName}
              onChange={handleChange}
              className="w-full border p-3 rounded mt-1"
              placeholder="Enter NGO name"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              value={user?.primaryEmailAddress?.emailAddress}
              disabled
              className="w-full border p-3 rounded mt-1 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="font-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded mt-1"
              placeholder="Contact number"
              required
            />
          </div>

          <div>
            <label className="font-semibold">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border p-3 rounded mt-1"
              placeholder="City"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-3 rounded mt-1"
              placeholder="NGO address"
              required
            ></textarea>
          </div>

          <div>
            <label className="font-semibold">NGO Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-3 rounded mt-1"
              placeholder="Brief description about your NGO"
              required
            ></textarea>
          </div>

          <div>
            <label className="font-semibold">Upload Certificate/Proof</label>
            <input
              type="file"
              name="document"
              onChange={handleChange}
              className="w-full border p-3 rounded mt-1"
              required
            />
          </div>

          <button className="w-full bg-green-700 text-white p-3 rounded-md text-lg hover:bg-green-800 transition">
            Submit Application
          </button>
        </form>
      </div>
    </>
  );
};

export default ApplyNgo;
