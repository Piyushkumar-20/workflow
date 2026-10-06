import * as authService from "./auth.service.js"
import ApiResponse from "../../utils/api-response.js"

const register = async(res, req) => {
    const user = await authService.register(req.body)
    return ApiResponse.created(res, "User registered Successfully", user)
}
const login = async(res, req) => {
    const {user, accessToken, refreshToken} = await authService.login(req.body)
    return ApiResponse.ok(res, "User LoggedIn Successfully", user)
}

export {register, login}