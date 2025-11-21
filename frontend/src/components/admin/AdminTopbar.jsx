import React from "react";
import { UserButton } from "@clerk/clerk-react";

const AdminTopbar = () => {
  return (
    <div className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-green-700">Admin Dashboard</h2>
      <UserButton />
    </div>
  );
};

export default AdminTopbar;
