import type { user } from './types'

export interface Response {
    status: boolean
    error?: string
}

export interface userResponse extends Response {
    data: user
}
