import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  // Read URL query parameter: ?redirect=/apply-ngo
  const redirectTo =
    new URLSearchParams(window.location.search).get("redirect") || "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Login to StrayCare
        </h1>

        <SignIn
          appearance={{
            elements: {
              card: "shadow-none",
              formButtonPrimary: "bg-green-700 hover:bg-green-800",
            },
          }}
          path="/login"
          routing="path"
          signUpUrl="/register"
          redirectUrl={redirectTo} // ⭐ The main fix
        />
      </div>
    </div>
  );
};

export default Login;
