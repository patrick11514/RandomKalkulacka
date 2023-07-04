export interface Response {
    status: boolean
    error?: string
}

export interface ResponseWithData<T> extends Response {
    data: T
}
