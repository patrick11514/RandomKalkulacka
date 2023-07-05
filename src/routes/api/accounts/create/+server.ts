import { DATABASE_NAME } from '$env/static/private'
import { checkData, isOk } from '$lib/server/functions'
import { conn, jwt } from '$lib/server/variables'
import type { Response, ResponseWithData } from '$types/response'
import type { account, user } from '$types/types'
import { json } from '@sveltejs/kit'
import { v4 } from 'uuid'
import { z } from 'zod'
import type { RequestHandler } from './$types'

export const POST = (async ({ request, cookies }) => {
    const schema = z.object({
        name: z
            .string({
                required_error: 'Nevyplnil jsi jméno účtu'
            })
            .min(3, 'Jméno účtu musí mít alespoň 3 znaky')
            .max(128, 'Jméno účtu může mít maximálně 128 znaků')
    })

    const body = await checkData(request, schema)

    if (isOk(body)) {
        return body
    }

    const { name } = body

    const session = cookies.get('session')

    if (!session) {
        return json({
            status: false,
            error: 'Nejsi přihlášen'
        } satisfies Response)
    }

    const data = await jwt.getCookie<user>(session)

    if (data === null) {
        return json({
            status: false,
            error: 'Nejsi přihlášen'
        } satisfies Response)
    }

    const { id } = data

    const uuid = v4()

    const insert = await conn.insert({
        query: 'INSERT INTO %d.`accounts` (`uuid`, `name`, `owner`) VALUES (?, ?, ?)',
        database: DATABASE_NAME,
        values: [uuid, name, id]
    })

    if (insert.affectedRows === 0) {
        return json({
            status: false,
            error: 'Nepodařilo se vytvořit účet, zkus to prosím znova'
        } satisfies Response)
    }

    return json({
        status: true,
        data: {
            uuid,
            name,
            owner: id
        }
    } satisfies ResponseWithData<account>)
}) satisfies RequestHandler
