import userService from "../services/UserService.js"

class UserController {
    async register(request, response) {
        try {
            const {email, name, password} = request.body
            const userData = await userService.register(email, name, password)

            response.cookie('refreshToken', userData.refreshToken, {
                maxAge: process.env.REFresponseH_TOKEN_EXPIresponse * 24 * 60 * 1000,
                httpOnly: true
            })
            return response.json(userData)
        } catch (e) {
            return response.json(e.message)
        }
    }

    async login(request, response) {
        try {
            const {email, password} = request.body
            const userData = await userService.login(email, password)

            response.cookie('refreshToken', userData.refreshToken, {
                maxAge: process.env.REFresponseH_TOKEN_EXPIresponse * 24 * 60 * 1000,
                httpOnly: true
            })
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
            return response.redirect(`${process.env.CLIENT_URL}/confirmation`)
        } catch (e) {

        }
    }

    async refresh(request, response) {
        try {
            const {refreshToken} = request.cookies
            const userData = await userService.refresh(refreshToken)
            response.cookie('refreshToken', userData.refreshToken, {
                maxAge: process.env.REFresponseH_TOKEN_EXPIresponse * 24 * 60 * 1000,
                httpOnly: true
            })
            return response.json(userData)
        } catch (e) {

        }
    }
}

export default new UserController();