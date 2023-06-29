import { jwt } from '$lib/server/variables'
import type { user } from '$types/types'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ cookies }) => {
    const token = cookies.get('session')

    if (!token) {
        throw redirect(302, '/')
    }

    const data = await jwt.getCookie<user>(token)

    if (!data) {
        throw redirect(302, '/')
    }
}) satisfies PageServerLoad
