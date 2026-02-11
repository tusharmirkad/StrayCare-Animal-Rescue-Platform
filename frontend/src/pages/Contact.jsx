import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import Navbar from "../components/navbar.jsx";
import useApi from "../utils/api";
import { toast } from "react-toastify";

const Contact = () => {
  const api = useApi();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all fields ❌");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/contact", form);
      toast.success("Message sent successfully! We'll be in touch soon ✅");

      // Reset form
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact submission error:", error);
      toast.error(
        error.response?.data?.message || "Failed to send message ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* PAGE TITLE */}
          <h1 className="text-4xl font-bold text-green-700 text-center mb-10">
            Contact Us
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT COLUMN - CONTACT FORM */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-6">
                Have questions, feedback, or want to collaborate? We'd love to
                hear from you.
              </p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Write your message..."
                    className="w-full border border-gray-300 p-3 rounded-md resize-none focus:ring-2 focus:ring-green-700"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-700 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN - INFO & MAP */}
            <div className="flex flex-col space-y-8">
              {/* CONTACT DETAILS CARD */}
              <div className="bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Contact Information
                </h2>

                <div className="space-y-5 text-gray-700">
                  <p className="flex items-center gap-3">
                    <FaPhoneAlt className="text-green-700 text-xl" />
                    <span>
                      <strong>Helpline:</strong> +91 XXXXX XXXXX
                    </span>
                  </p>

                  <p className="flex items-center gap-3">
                    <FaEnvelope className="text-green-700 text-xl" />
                    <span>
                      <strong>Email:</strong> support@straycare.org
                    </span>
                  </p>

                  <p className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-green-700 text-xl" />
                    <span>
                      <strong>Address:</strong> StrayCare HQ, Pune, Maharashtra
                    </span>
                  </p>
                </div>

                {/* SOCIAL MEDIA */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Follow Us
                  </h3>
                  <div className="flex gap-4 text-2xl text-green-700">
                    <FaFacebook className="cursor-pointer hover:text-green-900 transition" />
                    <FaTwitter className="cursor-pointer hover:text-green-900 transition" />
                    <FaInstagram className="cursor-pointer hover:text-green-900 transition" />
                  </div>
                </div>
              </div>

              {/* MAP EMBED (GOOGLE MAPS) */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Resources & How to Help</h3>
                <p className="text-gray-600 mb-4">Quick actions and resources for urgent animal assistance.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border p-4 rounded">
                    <h4 className="font-bold text-green-700">Emergency Hotline</h4>
                    <p className="text-gray-700">Call our 24/7 helpline: <strong>+91 99999 99999</strong></p>
                    <p className="text-sm text-gray-500 mt-2">For life-threatening situations, call immediately.</p>
                  </div>

                  <div className="border p-4 rounded">
                    <h4 className="font-bold text-green-700">Volunteer</h4>
                    <p className="text-gray-700">Join our rescue volunteers to make a difference.</p>
                    <a href="/apply/ngo" className="inline-block mt-2 text-sm text-blue-600 hover:underline">Sign up to volunteer</a>
                  </div>

                  <div className="border p-4 rounded">
                    <h4 className="font-bold text-green-700">Donate</h4>
                    <p className="text-gray-700">Support rescue operations and medical care.</p>
                    <a href="/donate" className="inline-block mt-2 text-sm text-blue-600 hover:underline">Donate now</a>
                  </div>

                  <div className="border p-4 rounded">
                    <h4 className="font-bold text-green-700">Safety Tips</h4>
                    <ul className="text-sm text-gray-700 list-disc ml-5">
                      <li>Approach slowly and avoid sudden movements.</li>
                      <li>Keep kids and pets away until help arrives.</li>
                      <li>Use a towel or blanket to safely contain small animals.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NGOS HELPLINE SECTION */}
          <div className="mt-14 bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Emergency NGO Contacts
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="border p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-green-700">
                  Mumbai Animal Rescue
                </h3>
                <p className="text-gray-700">Phone: +91 XXXXX XXXXX</p>
                <p className="text-gray-700">Available 24/7</p>
              </div>

              <div className="border p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-green-700">
                  Pune Stray Help
                </h3>
                <p className="text-gray-700">Phone: +91 XXXXX XXXXX</p>
                <p className="text-gray-700">Available: 9 AM - 11 PM</p>
              </div>

              <div className="border p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-green-700">
                  Nagpur Paw Protectors
                </h3>
                <p className="text-gray-700">Phone: +91 XXXXX XXXXX</p>
                <p className="text-gray-700">Available: 8 AM - 10 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
