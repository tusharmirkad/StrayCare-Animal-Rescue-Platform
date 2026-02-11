import React, { useState, useRef } from "react";
import { FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../components/navbar.jsx";
import useApi from "../utils/api";
import { toast } from "react-toastify";

import { useUser } from "@clerk/clerk-react";


const ReportIncident = () => {
  const api = useApi(); 
const { user } = useUser();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const initialForm = {
    animalType: "Dog",
    severity: "Low",
    description: "",
    address: "",
  };

  const [form, setForm] = useState(initialForm);

  const [location, setLocation] = useState({ lat: null, lng: null });
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
            setLocation({
          lat: Number(pos.coords.latitude),
          lng: Number(pos.coords.longitude),
        });
      });
    } else {
      toast.error("Geolocation not supported ❌")
    }
  };

 const handleSubmit = async () => {
  try {
    const fd = new FormData();

    fd.append("animalType", form.animalType);
    fd.append("severity", form.severity);
    fd.append("description", form.description);
    fd.append("address", form.address);

    fd.append("lat", location.lat);
    fd.append("lng", location.lng);

    fd.append("reporterName", user.fullName || "");
    fd.append("reporterEmail", user.primaryEmailAddress?.emailAddress || "");

    if (imageFile) fd.append("image", imageFile);

    const res = await api.post("/api/reports", fd, {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      },
    });

     toast.success("Report Submitted Successfully ✅");
    console.log(res.data);

    // Reset form and UI
    setForm(initialForm);
    setLocation({ lat: null, lng: null });
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);

    // Reset file input via ref
    if (fileInputRef.current) fileInputRef.current.value = null;

  } catch (err) {
    toast.error("Failed to submit report ❌");
    console.error(err);
  }
};


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-6 px-3 sm:py-10 sm:px-4">
        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md">

          <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center">
            Report Injured Animal
          </h1>

          {/* -------- FORM -------- */}
          <div className="space-y-4 sm:space-y-6">

            {/* Upload Photo */}
            <div>
              <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-2">
                Upload Photo
              </label>

              <div className="border-2 border-dashed border-gray-300 p-4 sm:p-6 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-green-600 transition">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-md"
                  />
                ) : (
                  <div className="text-center">
                    <FaCamera className="text-4xl text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-500">Click to upload a photo</p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="photo-input"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />

                <label
                  htmlFor="photo-input"
                  className="mt-4 bg-green-700 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-800 transition"
                >
                  Choose File
                </label>
              </div>
            </div>

            {/* Animal Type */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                Animal Type
              </label>
              <select
                value={form.animalType}
                onChange={(e) =>
                  setForm({ ...form, animalType: e.target.value })
                }
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-md text-sm sm:text-base"
              >
                <option>Dog</option>
                <option>Cat</option>
                <option>Cow</option>
                <option>Other</option>
              </select>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                Severity
              </label>
              <select
                value={form.severity}
                onChange={(e) =>
                  setForm({ ...form, severity: e.target.value })
                }
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-md text-sm sm:text-base"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows="4"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe the condition of the animal..."
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-md resize-none text-sm sm:text-base"
              ></textarea>
            </div>

            {/* Auto Location */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                Auto Location
              </label>

              <div className="flex flex-col gap-3 items-start sm:items-center sm:flex-row sm:gap-4">
                <button
                  onClick={fetchLocation}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base"
                >
                  <FaMapMarkerAlt /> Fetch My Location
                </button>

                <div className="text-gray-700 text-sm sm:text-base w-full sm:w-auto">
                  {(location.lat != null && location.lng != null) ? (
                    <p>
                      <strong>Lat:</strong> {location.lat.toFixed(5)} |{" "}
                      <strong>Lng:</strong> {location.lng.toFixed(5)}
                    </p>
                  ) : (
                    <p className="text-gray-500">Location not fetched yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Manual Address */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                Enter Address (Optional)
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                placeholder="Type the address manually..."
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-md text-sm sm:text-base"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-green-700 text-white py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-medium hover:bg-green-800 transition cursor-pointer"
              >
                Submit Report
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ReportIncident;
