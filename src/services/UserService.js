import User from "../models/User.js";
import bcrypt from 'bcrypt'
import {v4 as uuidv4} from "uuid";
import MailService from "./MailService.js";
import tokenService from "./TokenService.js";
import {UserDTO} from "../dtos/UserDTO.js";

class UserService {
    async register(email, name, password) {
        const candidate = await User.findOne({email})

        if (candidate && candidate.isActivated) {
            throw new Error('Такий користувач вже існує')
        }
        const passwordHash = await bcrypt.hash(password, 10)

        const activationLink = uuidv4()

        const user = await User.create({
            email,
            name,
            passwordHash: passwordHash,
            registerDate: Date.now(),
            activationLink: activationLink
        })

        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDTO(user)

        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink})

        if (!user) {
            throw new Error('Невірне посилання')
        }

        user.isActivated = true

        const userDto = new UserDTO(user)

        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        await user.save()

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password) {
        const user = await User.findOne({email})

        if (!user) {
            throw new Error(`Пошта або пароль невірні, перевірте правильність даних`)
        }

        const isPasswordTrue = await bcrypt.compare(password, user.passwordHash)

        if (!isPasswordTrue) {
            throw new Error(`Пошта або пароль невірні, перевірте правильність даних`)
        }

        const userDto = new UserDTO(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error("Не авторизовано")
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenDb = await tokenService.findToken(refreshToken)

        if (!userData || !tokenDb) {
            throw new Error("Не авторизовано")
        }

        const user = await User.findById(userData.id)
        const userDto = new UserDTO(user)
        const tokens = tokenService.saveToken()
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getUser(userId) {
        const user = await User.findById(userId).lean();

        return new UserDTO(user)
    }
}

export default new UserService();