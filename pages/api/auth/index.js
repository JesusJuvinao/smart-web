import jwt from 'jsonwebtoken'
import UserSchema from '../models/users/userLogin'
import withSession from '../../../apollo/session'
import { loginUser } from '../lib/resolvers/users/user'

export default withSession(async (req, res) => {
    const { uEmail, uPassword } = req.body
    try {
        const { token, message, success, refreshToken, roles } = await loginUser(null, { uEmail, uPassword })
        if (success) {
            const user = { isLoggedIn: true, token, admin: roles, refreshToken }
            req.session.set('user', user)
            await req.session.save()
            return res.json({ success, message })
        } else { res.json({ success: 0, message: 'Check that the fields are correct.' }) }
    } catch (error) {
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data)
    }
})

// --- Tokens

/**
 * @description Función que genera el token
 * @param {string} token Token JWT para el inicio de sesión y el id del usuario
 * @returns {{ user: string, userProfile: object, error: boolean }} devolución del token y los datos
 * @author Jesus_Juvinao
 */
export const getUserFromToken = async token => {
    let user = null
    let error = false
    if (!token) return null
    try {
        const { id } = jwt.verify(token, process.env.AUTHO_USER_KEY)
        user = await UserSchema.findOneById({ id }).populate()
    } catch {
        user = null
        error = { message: 'Invalid Token' }
    }
    return { user, /* userProfile, */ error }
}
