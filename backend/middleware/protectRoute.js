import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
    try {
       
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        
        const decoded = jwt.verify(token, "jPpMCVG9WPOx7T/d+AX9p104VHrZ/dpk2qOzjUq/OfQ=");

        if (!decoded) {
            return res.status(401).json({ error: "Invalid Token" });
        }

       
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ error: "No User Found" });
        }

        
        req.user = user;
        next();
    } catch (err) {
        console.log("Error in middleware", err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};
