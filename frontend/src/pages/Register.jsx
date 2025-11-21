import React from "react";
import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Create Your Account
        </h1>

        <SignUp
          appearance={{
            elements: {
              card: "shadow-none",
              formButtonPrimary: "bg-green-700 hover:bg-green-800",
            },
          }}
          path="/register"
          routing="path"
          signInUrl="/login"
        />
      </div>
    </div>
  );
};

export default Register;
