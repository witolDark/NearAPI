import UserService from "../services/UserService.js";

class UserController {
    async register(req, res) {
        try {
            const { email, name, password } = req.body
            const userData = await UserService.register(email, name, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 60 * 24 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            return res.json(e.message)
        }
    }

    async login(req, res) {
        try {

        } catch (e) {

        }
    }

    async logout(req, res) {
        try {

        } catch (e) {

        }
    }

    async activate(req, res) {
        try {

        } catch (e) {

        }
    }

    async refresh(req, res) {
        try {

        } catch (e) {

        }
    }
}

export default new UserController();