import { clerkClient } from "@clerk/clerk-sdk-node";
import Ngo from "../models/Ngo.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

export const requireAdmin = [
  ClerkExpressRequireAuth(),
  (req, res, next) => {
    // Log incoming auth header and req.auth for debugging
    console.log("AUTH HEADER:", req.headers?.authorization);
    console.log("REQ.AUTH:", req.auth);
    (async () => {
      try {
        // Prefer fetching user metadata directly from Clerk using userId
        const userId = req.auth?.userId;
        if (!userId) {
          console.log("No userId in req.auth");
          return res.status(401).json({ message: "Unauthorized" });
        }

        const clerkUser = await clerkClient.users.getUser(userId);
        console.log("CLERK USER PUBLIC METADATA:", clerkUser.publicMetadata);

        const role = clerkUser.publicMetadata?.role || req.auth?.sessionClaims?.publicMetadata?.role;
        console.log("ADMIN ROLE:", role);

        if (role !== "admin") {
          return res.status(401).json({ message: "Admin access required" });
        }

        next();
      } catch (err) {
        console.error("Error verifying admin role:", err);
        return res.status(500).json({ message: "Internal auth error" });
      }
    })();
  },
];


// import Ngo from "../models/Ngo.js";

export const requireNgo = async (req, res, next) => {
  // 🔍 ADD THIS LINE
  console.log("Clerk User ID:", req.auth.userId);

  const clerkUserId = req.auth.userId;

  const ngo = await Ngo.findOne({ clerkUserId });

  if (!ngo || !ngo.approved) {
  return res.status(403).json({
    message: "Access denied: NGO not approved or not found"
  });
}


  req.ngo = ngo;
  next();
};




