import { jwt } from '$lib/server/variables'
import type { user } from '$types/types'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ cookies }) => {
    const token = cookies.get('session')

    if (!token) {
        return
    }

    const data = await jwt.getCookie<user>(token)

    if (data) {
        throw redirect(302, '/dash')
    }
}) satisfies PageServerLoad
