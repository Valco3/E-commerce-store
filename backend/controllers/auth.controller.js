import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import {rtokens} from "../data/rtokens.js"
import { decrypt } from "dotenv"

const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"})
    const refreshToken = jwt.sign({userId}, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"})
    return {accessToken, refreshToken}
}

const storeRefreshToken = async (userId, refresh_token) => {
    try {
        await rtokens.set(`refresh_token:${userId}`, refresh_token, "EX", 30 * 24 * 60 * 60)
    } catch (error) {
        console.log(error)
    }

}

const setCookies = (res, accessToken, refreshToken) => {
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
        await storeRefreshToken(user._id, refreshToken)

        setCookies(res, accessToken, refreshToken)
    
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
            await storeRefreshToken(user._id, refreshToken)

            setCookies(res, accessToken, refreshToken)
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
        if(refreshToken){
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            await rtokens.del(`refresh_token:${decoded.userId}`)
        }

        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        res.json({message: "Logout successful"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken)  {
            return res.status(402).json({message: "Refresh token not found"})
        }
        
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const storedToken = await rtokens.get(`refresh_token:${decoded.userId}`)

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

// export const getProfile = async (req, res) => {

// }