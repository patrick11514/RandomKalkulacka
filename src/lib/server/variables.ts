import {
	DATABASE_IP,
	DATABASE_PASSWORD,
	DATABASE_PORT,
	DATABASE_USER
} from '$env/static/private';
import { MySQL } from './mysql/main';

export const conn = new MySQL({
	host: DATABASE_IP,
	port: parseInt(DATABASE_PORT),
	user: DATABASE_USER,
	password: DATABASE_PASSWORD
});

await conn.connect();
import { JWT_SECRET } from "$env/static/private"
import { JWTCookies } from './cookies/main';
export const jwt = new JWTCookies(JWT_SECRET)
