import React, { useState } from "react";
import { FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../components/navbar";

const ReportIncident = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState({ lat: "", lng: "" });

  // Upload Image Preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Auto-detect GPS Location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Report Injured Animal
          </h1>

          {/* FORM CARD */}
          <div className="space-y-6">
            {/* Upload Photo */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Photo
              </label>

              <div className="border-2 border-dashed border-gray-300 p-6 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-green-600 transition">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-md"
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
              <label className="block font-semibold text-gray-700 mb-2">
                Animal Type
              </label>
              <select className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600">
                <option>Dog</option>
                <option>Cat</option>
                <option>Cow</option>
                <option>Other</option>
              </select>
            </div>

            {/* Severity */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Severity
              </label>
              <select className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows="4"
                placeholder="Describe the condition of the animal..."
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
              ></textarea>
            </div>

            {/* Auto Location */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Auto Location
              </label>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  onClick={fetchLocation}
                  className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition"
                >
                  <FaMapMarkerAlt /> Fetch My Location
                </button>

                <div className="text-gray-700">
                  {location.lat ? (
                    <p>
                      <strong>Lat:</strong> {location.lat.toFixed(5)}
                      {" | "}
                      <strong>Lng:</strong> {location.lng.toFixed(5)}
                    </p>
                  ) : (
                    <p className="text-gray-500">Location not fetched yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Manual Location */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Enter Address (Optional)
              </label>
              <input
                type="text"
                placeholder="Type the address manually..."
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button className="bg-green-700 text-white w-full sm:w-1/2 py-3 rounded-md text-lg hover:bg-green-800 transition">
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
