import { DATABASE_NAME } from '$env/static/private'
import { conn, jwt } from '$lib/server/variables'
import type { Response, ResponseWithData } from '$types/response.js'
import type { account, user } from '$types/types'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET = (async ({ cookies }) => {
    const token = cookies.get('session')

    if (token === undefined) {
        return json({
            status: false,
            error: 'Nejsi přihlášen'
        } satisfies Response)
    }

    const data = await jwt.getCookie<user>(token)

    if (data === null) {
        return json({
            status: false,
            error: 'Nejsi přihlášen'
        })
    }

    const { id } = data

    const request = await conn.select<account>({
        query: 'SELECT * FROM %d.`accounts` WHERE `owner` = ?',
        database: DATABASE_NAME,
        values: [id]
    })

    return json({
        status: true,
        data: request
    } satisfies ResponseWithData<account[]>)
}) satisfies RequestHandler
