import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import {rtokens} from "../data/rtokens.js"
import {v4 as uuidv4} from "uuid";
import { decrypt } from "dotenv"

const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"})
    const refreshToken = jwt.sign({userId}, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"})
    return {accessToken, refreshToken}
}

const storeRefreshToken = async (userId, refresh_token, uniqueId) => {
    try {
        await rtokens.set(`refresh_token:${userId}:${uniqueId}`, refresh_token, "EX", 30 * 24 * 60 * 60)
    } catch (error) {
        console.log(error)
    }

}

const setCookies = (res, accessToken, refreshToken, uniqueId) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 60 *  1000
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    res.cookie("uniqueId", uniqueId, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}
export const signup = async (req, res) => {  
    const {email, password, name} = req.body;
    try {
        const userExists = await User.findOne({email})

        if(userExists) {
            return res.status(400).json({message: "User already exists"})
        }
    
        const user = await User.create({
            name,
            email,
            password
        })

        const {accessToken, refreshToken} = generateTokens(user._id)
        const uniqueId = uuidv4()
        await storeRefreshToken(user._id, refreshToken, uniqueId)

        setCookies(res, accessToken, refreshToken, uniqueId)
    
        res.status(201).json({_id: user._id, name:user.name, email:user.email, role:user.role})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const login = async (req, res) => {  
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(user && (await user.matchPassword(password))) {
            const {accessToken, refreshToken} = generateTokens(user._id)
            const uniqueId = uuidv4()
            await storeRefreshToken(user._id, refreshToken, uniqueId)

            setCookies(res, accessToken, refreshToken, uniqueId)
            res.json({
                _id: user._id,
                name:user.name,
                email:user.email,
                role:user.role
            })
        }else {
            res.status(401).json({message: "Invalid email or password"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const logout = async (req, res) => {  
    try {
        const refreshToken = req.cookies.refreshToken
        const uniqueId = req.cookies.uniqueId
        if(refreshToken && uniqueId) {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            await rtokens.del(`refresh_token:${decoded.userId}:${uniqueId}`)
        }

        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        res.clearCookie("uniqueId")
        res.json({message: "Logout successful"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        const uniqueId = req.cookies.uniqueId
        if(!refreshToken || !uniqueId)  {
            return res.status(402).json({message: "Refresh token or uniqueId not found"})
        }
        
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const storedToken = await rtokens.get(`refresh_token:${decoded.userId}:${uniqueId}`)

        if(storedToken !== refreshToken) {
            return res.status(403).json({message: "Invalid refresh token"})
        }

        const accessToken = jwt.sign({userId: decoded.userId}, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"})

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 60 *  1000
        })

        res.json({message: "Token refreshed"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProfile = async (req, res) => {
    try {
        res.json(req.user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}