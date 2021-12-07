import withSession from '../../../apollo/session'
import { newRegisterUser } from '../lib/resolvers/users/user'

export default withSession(async (req, res) => {
    const { uEmail, uPassword, userName } = req.body
    try {
        const { success, token, refreshToken, userId, message, roles } = await newRegisterUser(null, { uEmail, uPassword, userName })
        if (token) {
            const user = { isLoggedIn: true, token, success, refreshToken, message, roles }
            req.session.set('user', user)
            await req.session.save()
            return res.json({ token, success, refreshToken, message, roles, userId })
        } else { res.json({ success: 0, message: 'Incorrect username and password' }) }
    } catch (error) {
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data)
    }
})
