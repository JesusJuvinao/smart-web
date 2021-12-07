import { withIronSession } from 'next-iron-session'

export default function withSession (handler) {
    const ttl = new Date(Date.now() + 2647483647)
    return withIronSession(handler, {
        password: process.env.SESSION_KEY,
        // Session Name
        cookieName: process.env.SESSION_NAME,
        cookieOptions: {
            maxAge: ttl
        }
    })
}
