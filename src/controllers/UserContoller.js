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

            return response.json(userData)
        } catch (e) {

        }
    }

    async logout(request, response) {
        try {
            const {refreshToken} = request.cookies
            const token = await userService.logout(refreshToken)
            response.clearCookie('refreshToken')
            return response.json(token)
        } catch (e) {

        }
    }

    async activate(request, response) {
        try {
            const activationLink = request.params.link
            await userService.activate(activationLink)
            return response.redirect(`${process.env.CLIENT_URL}/auth/login`)
        } catch (e) {

        }
    }

    async refresh(request, response) {
        try {
            const {refreshToken} = request.cookies
            const userData = await userService.refresh(refreshToken)

            return response.json(userData)
        } catch (e) {

        }
    }

    async
}

export default new UserController();