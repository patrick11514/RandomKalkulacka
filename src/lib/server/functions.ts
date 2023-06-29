import { json } from '@sveltejs/kit'

export const checkData = async <T>(request: Request, obj: Zod.ZodType<T>): Promise<Response | Zod.infer<typeof obj>> => {
    let data

    try {
        data = await request.json()
    } catch (_) {
        return json({
            status: false,
            error: 'Invalid data'
        })
    }

    const resp = obj.safeParse(data)

    if (resp.success) {
        return resp.data
    }

    return json({
        status: false,
        error: resp.error
    })
}

export const isOk = (data: Response | unknown): data is Response => {
    return data instanceof Response
}
