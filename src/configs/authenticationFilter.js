import { getAuth } from "firebase-admin/auth";
import fbApp from "./firebaseConfig.js";

const isAuthenticated = async (req, res, next) => {
  // ✅ Dev bypass (ONLY for local testing)
  if (process.env.BYPASS_AUTH === "true") {
    req.user = { uid: "dev-user" };
    return next();
  }

  const authHeader = req.headers.authorization;

  // Must exist and look like: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const firebaseAuth = getAuth(fbApp);
    const decodedToken = await firebaseAuth.verifyIdToken(token);

    req.user = decodedToken;
    return next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

export default isAuthenticated;

