import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 ml-64 bg-gray-50 min-h-screen p-6">
        <AdminTopbar />

        {/* Welcome */}
        <h1 className="text-3xl font-bold text-green-700 mt-6">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-10">
          Manage NGOs, rescue requests, and platform health.
        </p>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Total NGOs */}
          <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Total NGOs</h3>
            <p className="text-4xl font-bold text-green-700 mt-2">42</p>
            <p className="text-green-600 text-sm mt-1">+5 this month</p>
          </div>

          {/* Pending NGOs */}
          <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Pending NGO Applications</h3>
            <p className="text-4xl font-bold text-orange-500 mt-2">7</p>
            <Link
              to="/admin/ngos"
              className="text-green-700 underline text-sm mt-2 block"
            >
              Review applications →
            </Link>
          </div>

          {/* Rescue Requests */}
          <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Active Rescue Requests</h3>
            <p className="text-4xl font-bold text-red-500 mt-2">19</p>
            <Link
              to="/admin/rescue-requests"
              className="text-green-700 underline text-sm mt-2 block"
            >
              Manage requests →
            </Link>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Platform Health</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">98%</p>
            <p className="text-gray-500 text-sm mt-1">All systems running</p>
          </div>
        </div>

        {/* ANALYTICS */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Analytics Overview
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Chart 1 – Rescue Requests Trend */}
            <div className="bg-white rounded-xl shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Rescue Requests – Last 6 Months
              </h3>

              {/* Custom Mini Chart (NO library) */}
              <div className="relative h-40 flex items-end gap-4">
                {[20, 35, 25, 40, 30, 45].map((value, i) => (
                  <div key={i} className="flex-1">
                    <div
                      className="bg-green-600 rounded-t"
                      style={{ height: `${value * 2}px` }}
                    ></div>
                    <p className="text-xs text-center mt-1 text-gray-500">
                      {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"][i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2 – NGO Growth */}
            <div className="bg-white rounded-xl shadow border p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                New NGOs Registered – Yearly Growth
              </h3>

              <div className="relative h-40 flex items-end gap-4">
                {[10, 15, 22, 32, 40].map((value, i) => (
                  <div key={i} className="flex-1">
                    <div
                      className="bg-blue-500 rounded-t"
                      style={{ height: `${value * 2}px` }}
                    ></div>
                    <p className="text-xs text-center mt-1 text-gray-500">
                      {2020 + i}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SYSTEM OVERVIEW */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow border">
          <h2 className="text-xl font-bold text-green-700 mb-3">
            System Overview
          </h2>
          <p className="text-gray-600 leading-relaxed">
            As an administrator, you oversee NGO verification, rescue request
            monitoring, and overall safety of stray animals. This dashboard
            gives you an overview of platform performance, request load, and
            partner NGO activity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
