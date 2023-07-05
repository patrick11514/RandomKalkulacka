export interface user {
    id: number
    username: string
}

export interface account {
    uuid: string
    name: string
    owner: number
}

export interface accountData {
    uuid: string
    name: string
    owner: {
        id: number
        name: string
    }
    currency: string | null
    balance: number | null
}
