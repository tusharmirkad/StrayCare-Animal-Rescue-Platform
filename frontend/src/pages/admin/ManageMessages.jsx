import React, { useEffect, useState } from "react";
import AdminTopbar from "../../components/admin/AdminTopbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import useApi from "../../utils/api";
import { toast } from "react-toastify";
import { FaTrash, FaEnvelope, FaUser, FaClock } from "react-icons/fa";
import { FaReply } from "react-icons/fa";

const ManageMessages = () => {
  const api = useApi();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replySubject, setReplySubject] = useState("");
  const [replyBody, setReplyBody] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/contact/admin/messages");
      setMessages(res.data || []);
    } catch (error) {
      console.error("Fetch messages error:", error);
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/api/contact/admin/messages/${id}/read`);
      setMessages(
        messages.map((msg) => (msg._id === id ? { ...msg, status: "read" } : msg))
      );
      toast.success("Message marked as read ✅");
    } catch (error) {
      console.error("Update message error:", error);
      toast.error("Failed to update message");
    }
  };

  const openReply = (msg) => {
    setSelectedMessage(msg);
    setReplySubject(`Re: ${msg.subject}`);
    setReplyBody(`\n\n--- Original Message ---\nFrom: ${msg.name} <${msg.email}>\n\n${msg.message}`);
    setReplyOpen(true);
  };

  const handleSendReply = async () => {
    if (!selectedMessage) return;
    try {
      const res = await api.post(`/api/contact/admin/messages/${selectedMessage._id}/reply`, {
        subject: replySubject,
        message: replyBody,
      });
      // update UI: mark as read
      setMessages(messages.map((m) => (m._id === selectedMessage._id ? { ...m, status: "read" } : m)));
      setReplyOpen(false);
      const previewUrl = res?.data?.previewUrl;
      if (previewUrl) {
        toast.info("Reply sent — open preview in a new tab");
        window.open(previewUrl, "_blank");
      } else {
        toast.success("Reply sent ✅");
      }
    } catch (error) {
      console.error("Reply error:", error);
      toast.error("Failed to send reply");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await api.delete(`/api/contact/admin/messages/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
      setSelectedMessage(null);
      toast.success("Message deleted ✅");
    } catch (error) {
      console.error("Delete message error:", error);
      toast.error("Failed to delete message");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

      {/* -------- Main Content -------- */}
      <div className="flex-1 md:ml-64 p-4 sm:p-6">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* PAGE HEADER */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800">Contact Messages</h1>
              <p className="text-gray-600 mt-2">
                Manage messages from users who contacted via the Contact Us form
              </p>
            </div>

            {/* MESSAGES COUNT */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600">Total Messages</p>
                <p className="text-3xl font-bold text-green-700">{messages.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600">New</p>
                <p className="text-3xl font-bold text-blue-600">
                  {messages.filter((m) => m.status === "new").length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600">Read</p>
                <p className="text-3xl font-bold text-gray-600">
                  {messages.filter((m) => m.status === "read").length}
                </p>
              </div>
            </div>

            {/* MESSAGES TABLE */}
            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-600">Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="bg-white p-10 rounded-lg shadow text-center">
                <p className="text-gray-600">No messages yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* MESSAGES LIST */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
                  <div className="max-h-96 overflow-y-auto">
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        onClick={() => setSelectedMessage(msg)}
                        className={`p-4 border-b cursor-pointer transition ${
                          selectedMessage?._id === msg._id
                            ? "bg-green-50 border-l-4 border-green-700"
                            : "hover:bg-gray-50"
                        } ${msg.status === "new" ? "bg-blue-50" : ""}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-800">{msg.subject}</p>
                            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                              <FaUser className="text-gray-500" /> {msg.name}
                            </p>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              msg.status === "new"
                                ? "bg-blue-200 text-blue-800"
                                : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            {msg.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <FaClock className="text-gray-500" /> {formatDate(msg.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MESSAGE DETAILS */}
                {selectedMessage && (
                  <div className="bg-white rounded-lg shadow p-6 lg:col-span-1">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {selectedMessage.subject}
                      </h3>

                      <div className="space-y-3 text-sm mb-4">
                        <div>
                          <p className="text-gray-600">From</p>
                          <p className="font-semibold text-gray-800">
                            {selectedMessage.name}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-600 flex items-center gap-2">
                            <FaEnvelope className="text-green-700" /> Email
                          </p>
                          <a
                            href={`mailto:${selectedMessage.email}`}
                            className="text-blue-600 hover:underline break-all"
                          >
                            {selectedMessage.email}
                          </a>
                        </div>

                        <div>
                          <p className="text-gray-600 flex items-center gap-2">
                            <FaClock className="text-gray-500" /> Date
                          </p>
                          <p className="text-gray-800">
                            {formatDate(selectedMessage.createdAt)}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-600">Status</p>
                          <span
                            className={`text-xs px-2 py-1 rounded inline-block ${
                              selectedMessage.status === "new"
                                ? "bg-blue-200 text-blue-800"
                                : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            {selectedMessage.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-gray-600 text-sm mb-2">Message</p>
                        <p className="text-gray-800 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
                          {selectedMessage.message}
                        </p>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-2">
                      {selectedMessage.status === "new" && (
                        <button
                          onClick={() => handleMarkAsRead(selectedMessage._id)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm font-semibold"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => openReply(selectedMessage)}
                        className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        <FaReply /> Reply
                      </button>
                      <button
                        onClick={() => handleDelete(selectedMessage._id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition flex items-center justify-center gap-2 text-sm font-semibold"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Reply Modal */}
            {replyOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40" onClick={() => setReplyOpen(false)}></div>
                <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-2xl">
                  <h3 className="text-lg font-semibold mb-3">Reply to {selectedMessage.name}</h3>
                  <input
                    value={replySubject}
                    onChange={(e) => setReplySubject(e.target.value)}
                    className="w-full border p-2 mb-3"
                    placeholder="Subject"
                  />
                  <textarea
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    rows={8}
                    className="w-full border p-2 mb-3"
                    placeholder="Write your reply..."
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setReplyOpen(false)} className="px-4 py-2 rounded border">Cancel</button>
                    <button onClick={handleSendReply} className="px-4 py-2 rounded bg-indigo-600 text-white">Send Reply</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageMessages;
