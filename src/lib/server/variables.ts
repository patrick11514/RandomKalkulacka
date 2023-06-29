import { DATABASE_IP, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER, JWT_SECRET } from '$env/static/private'
import { JWTCookies } from './cookies/main'
import { MySQL } from './mysql/main'

export const conn = new MySQL(
    {
        host: DATABASE_IP,
        port: parseInt(DATABASE_PORT),
        user: DATABASE_USER,
        password: DATABASE_PASSWORD
    },
    true
)

conn.connect()
export const jwt = new JWTCookies(JWT_SECRET)
