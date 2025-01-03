import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken
        if(!accessToken) {
            return res.status(401).json({message: "No access token provided"})
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
            const user = await User.findById(decoded.userId).select("-password")
            if(!user) {
                return res.status(401).json({message: "User not found"})
            }
            req.user = user;
            next()
        } catch (error) {
            if(error.name === "TokenExpiredError") {
                return res.status(401).json({message: "Сесията Ви е изтекла"})
            }
            throw error
        }
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
}

export const adminRoute = async (req, res, next) => {
    if(req.user && (req.user.role === "admin" || req.user.role === "superadmin")) {
        next()
    } else {
        return res.status(403).json({message: "Нямате достъп"})
    }
}

export const superAdminRoute = async (req, res, next) => {
    if(req.user && (req.user.role === "superadmin")) {
        next()
    } else {
        return res.status(403).json({message: "Нямате достъп"})
    }
}