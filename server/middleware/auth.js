import User from "../models/User.js";
import jwt from "jsonwebtoken";

//Middleware to protect route
export const protectRoute = async (req, res, next) => {   // <-- use res, not resizeBy
  try {
    // Accept token from either req.headers.token or Authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization || '';
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.headers.token) {
      token = req.headers.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "jwt must be provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId || decoded.id).select("-password");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    req.user = user;
    next();

  } catch (error) {
    console.log('protectRoute error:', error.message || error);
    // If jwt.verify threw, send 401; otherwise generic 500
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
    return res.status(500).json({ success: false, message: 'Server error in auth middleware' });
  }
}
