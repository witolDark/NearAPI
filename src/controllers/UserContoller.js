import userService from "../services/UserService.js"

class UserController {
    async register(req, res) {
        try {
            const {email, name, password} = req.body
            const userData = await userService.register(email, name, password)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: process.env.REFRESH_TOKEN_EXPIRES * 24 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (e) {
            return res.json(e.message)
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: process.env.REFRESH_TOKEN_EXPIRES * 24 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (e) {

        }
    }

    async logout(req, res) {
        try {
            const {refteshToken} = req.cookies
            const token = await userService.logout(refteshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {

        }
    }

    async activate(req, res) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(`${process.env.CLIENT_URL}/confirmation`)
        } catch (e) {

        }
    }

    async refresh(req, res) {
        try {
            const {refteshToken} = req.cookies
            const userData = await userService.refresh(refteshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: process.env.REFRESH_TOKEN_EXPIRES * 24 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        } catch (e) {

        }
    }
}

export default new UserController();