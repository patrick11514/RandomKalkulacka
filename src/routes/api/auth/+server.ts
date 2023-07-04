import { DATABASE_NAME } from '$env/static/private'
import { checkData, isOk } from '$lib/server/functions'
import { conn, jwt } from '$lib/server/variables'
import type { Response, ResponseWithData } from '$types/response'
import { json } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import type { RequestHandler } from './$types'

export const POST = (async ({ request, cookies }) => {
    const schema = z.object({
        action: z.literal('login').or(z.literal('register')),
        username: z.string({
            required_error: 'Nevyplnil jsi uživatelské jméno'
        }),
        password: z.string()
    })

    const body = await checkData(request, schema)

    if (isOk(body)) {
        return body
    }

    const { action, username, password } = body

    if (action == 'login') {
        const data = await conn.select<{
            password: string
            id: number
            username: string
        }>({
            query: 'SELECT * FROM %d.`users` WHERE `username` = ?',
            database: DATABASE_NAME,
            values: [username]
        })

        if (data.length === 0) {
            return json({
                status: false,
                error: 'Uživatel neexistuje'
            } satisfies Response)
        }

        const { password: hash, id, username: realname } = data[0]

        if (!bcrypt.compareSync(password, hash)) {
            return json({
                status: false,
                error: 'Špatné heslo'
            } satisfies Response)
        }

        const userData = {
            id,
            username: realname
        }

        const token = await jwt.setCookie(userData)

        cookies.set('session', token, {
            path: '/'
        })

        return json({
            status: true,
            data: userData
        } satisfies ResponseWithData<typeof userData>)
    }

    //check if user exists
    const data = await conn.select<{
        id: number
    }>({
        query: 'SELECT * FROM %d.`users` WHERE `username` = ?',
        database: DATABASE_NAME,
        values: [username]
    })

    if (data.length !== 0) {
        return json({
            status: false,
            error: 'Uživatel již existuje'
        } satisfies Response)
    }

    const hash = bcrypt.hashSync(password, 10)

    const insert = await conn.insert({
        query: 'INSERT INTO %d.`users` (`username`, `password`) VALUES (?, ?)',
        database: DATABASE_NAME,
        values: [username, hash]
    })

    if (insert.affectedRows !== 1) {
        return json({
            status: false,
            error: 'Nepodařilo se vytvořit účet'
        } satisfies Response)
    }

    const userData = {
        id: Number(insert.insertId),
        username
    }

    const token = await jwt.setCookie(userData)

    cookies.set('session', token, {
        path: '/'
    })

    return json({
        status: true,
        data: userData
    } satisfies ResponseWithData<typeof userData>)
}) satisfies RequestHandler
