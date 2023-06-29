import { jwt } from '$lib/server/variables'
import type { user } from '$types/types'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ cookies }) => {
    const token = cookies.get('session')

    if (!token) {
        return {
            status: false
        } as const
    }

    const data = await jwt.getCookie<user>(token)

    if (!data) {
        return {
            status: false
        } as const
    }

    return {
        status: true,
        data
    } as const
}) satisfies LayoutServerLoad
