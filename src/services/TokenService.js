import jwt from 'jsonwebtoken';
import Token from "../models/Token.js";

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES});

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId})

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
    }

    async removeToken(refreshToken) {
        return Token.deleteOne({refreshToken});
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_TOKEN_KEY)
        } catch (e) {
            return null
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        } catch (e) {
            return null
        }
    }


    async findToken(token) {
        try {
            return Token.findOne({token})
        } catch (e) {

        }
    }
}

export default new TokenService;