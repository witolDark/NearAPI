import UserModel from "../models/User.js";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from "uuid";
import MailService from "./MailService.js";
import tokenService from "./TokenService.js";
import {UserDTO} from "../dtos/UserDTO.js";

class UserService {
    async register(email, name, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw new Error('Такий користувач вже існує')
        }
        const passwordHash = await bcrypt.hash(password, 10)

        const activationLink = uuidv4()

        const user = await UserModel.create({email, name, passwordHash: passwordHash, registerDate: Date.now(), activationLink: activationLink})

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
        const user = await UserModel.findOne({activationLink})

        if (!user) {
            throw new Error('Невірне посилання')
        }

        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})

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
}

export default new UserService();