import { DATABASE_NAME } from '$env/static/private'
import { checkData, isOk } from '$lib/server/functions'
import { conn, jwt } from '$lib/server/variables'
import type { ResponseWithData } from '$types/response'
import type { accountData, user } from '$types/types'
import { json } from '@sveltejs/kit'
import { z } from 'zod'
import type { RequestHandler } from './$types'

export const POST = (async ({ request, cookies }) => {
    const schema = z.object({
        uuid: z.string({
            required_error: 'Nevyplnil jsi uuid'
        })
    })

    const body = await checkData(request, schema)

    if (isOk(body)) {
        return body
    }

    const { uuid } = body

    const session = cookies.get('session')

    if (!session) {
        return json({
            status: false,
            error: 'Nejsi přihlášen'
        })
    }

    const data = await jwt.getCookie<user>(session)

    if (data === null) {
        return json({
            status: false,
            error: 'Nejsi přihlášen'
        })
    }

    const { id } = data

    const select = await conn.select<
        Omit<accountData, 'owner'> & {
            owner: number
            username: string
        }
    >({
        query: 'SELECT `uuid`, `name`, `owner`, `currency`, `balance`, `username` FROM %d.`accounts` LEFT JOIN %d.`data` ON `accounts`.`uuid` = `data`.`account` INNER JOIN %d.`users` ON `accounts`.`owner` = `users`.`id` WHERE `uuid` = ? AND `owner` = ?',
        database: DATABASE_NAME,
        values: [uuid, id]
    })

    if (select.length === 0) {
        return json({
            status: false,
            error: 'Účet neexistuje'
        })
    }

    return json({
        status: true,
        data: {
            uuid: select[0].uuid,
            name: select[0].name,
            owner: {
                id: select[0].owner,
                name: select[0].username
            },
            currency: select[0].currency,
            balance: select[0].balance
        }
    } satisfies ResponseWithData<accountData>)
}) satisfies RequestHandler
