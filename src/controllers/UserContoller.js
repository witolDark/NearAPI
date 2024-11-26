import userService from "../services/UserService.js"

class UserController {
    async register(request, response) {
        try {
            const {email, name, password} = request.body
            await userService.register(email, name, password)

            return response.status(200)
        } catch (e) {
            return response.json(e.message)
        }
    }

    async login(request, response) {
        try {
            const {email, password} = request.body
            const userData = await userService.login(email, password)

            response.cookie('refreshToken', userData.refreshToken, {
                maxAge: process.env.REFRESH_TOKEN_EXPIRES * 24 * 60 * 1000,
                httpOnly: true
            })
            return response.json(userData)
        } catch (e) {

        }
    }

    async logout(request, response) {
        try {
            const {refteshToken} = request.cookies
            const token = await userService.logout(refteshToken)
            response.clearCookie('refreshToken')
            return response.json(token)
        } catch (e) {

        }
    }

    async activate(request, response) {
        try {
            const activationLink = request.params.link
            await userService.activate(activationLink)
            return response.redirect(`${process.env.CLIENT_URL}/main/events`)
        } catch (e) {

        }
    }

    async refresh(request, response) {
        try {
            const {refteshToken} = request.cookies
            const userData = await userService.refresh(refteshToken)
            request.cookie('refreshToken', userData.refreshToken, {
                maxAge: process.env.REFRESH_TOKEN_EXPIRES * 24 * 60 * 1000,
                httpOnly: true
            })
            return response.json(userData)
        } catch (e) {
            response.json(e.message)
        }
    }
}

export default new UserController();