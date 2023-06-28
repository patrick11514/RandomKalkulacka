import db, { type ConnectionConfig } from 'mariadb'

/**
 * @author patrick115 (Patrik Mintěl)
 * @license MIT
 * @version 1.0.1
 * @description MySQL/MariaDB lib
 * @homepage https://patrick115.eu
 */

export class MySQL {
    private connection: db.Pool | null = null
    private options: ConnectionConfig
    private connected = false
    private logConnections: boolean

    constructor(options: ConnectionConfig, logConnections = false) {
        this.options = options
        this.logConnections = logConnections
    }

    public connect() {
        this.connection = db.createPool(this.options)
        console.log(`[MYSQL] Created MySQL connection pool`)
        this.connected = true

        if (this.logConnections) {
            this.connection.on('acquire', (connection) => {
                console.log(`[MYSQL] Connection ${connection.threadId} acquired`)
            })

            this.connection.on('release', (connection) => {
                console.log(`[MYSQL] Connection ${connection.threadId} released`)
            })

            this.connection.on('enqueue', () => {
                console.log(`[MYSQL] Waiting for available connection slot`)
            })
        }
    }

    /**
     *
     * @param query query string, where you can use %d for database and %t for table
     * @param values array of values to replace ? in query string
     * @param database replace %d if provided as string, if provided as array, it will replace %d0, %d1, %d2, ...
     * @param table replace %t if provided as string, if provided as array, it will replace %t0, %t1, %t2, ...
     * @returns return query result as T (use T[] for SELECT)
     */
    async query<T>(query: string, values?: Array<unknown>, database?: string | string[], table?: string | string[]) {
        if (this.connection === null || !this.connected) throw new Error('[MYSQL] Not connected to database')

        //replace database string
        if (typeof database === 'string') {
            query = query.replaceAll('%d', `\`${database}\``)
        } else if (Array.isArray(database)) {
            for (let i = 0; i < database.length; i++) {
                query = query.replaceAll(`%d${i}`, `\`${database[i]}\``)
            }
        }

        //replace table string
        if (typeof table === 'string') {
            query = query.replaceAll('%t', `\`${table}\``)
        } else if (Array.isArray(table)) {
            for (let i = 0; i < table.length; i++) {
                query = query.replaceAll(`%t${i}`, `\`${table[i]}\``)
            }
        }

        const data = await this.connection.query(query, values)
        if (query.startsWith('SELECT')) {
            return data as T[]
        }
        return data as T
    }

    /**
     *
     * @param query query string, where you can use %d for database and %t for table
     * @param values array of values to replace ? in query string
     * @param database replace %d if provided as string, if provided as array, it will replace %d0, %d1, %d2, ...
     * @param table replace %t if provided as string, if provided as array, it will replace %t0, %t1, %t2, ...
     * @returns returns selected data as T[]
     */
    async select<T>({ query, values, database, table }: Data) {
        return this.query<T[]>(query, values, database, table)
    }

    /**
     *
     * @param query query string, where you can use %d for database and %t for table
     * @param values array of values to replace ? in query string
     * @param database replace %d if provided as string, if provided as array, it will replace %d0, %d1, %d2, ...
     * @param table replace %t if provided as string, if provided as array, it will replace %t0, %t1, %t2, ...
     * @returns returns affected rows
     */
    async insert({ query, values, database, table }: Data) {
        return this.query<InsertResponse>(query, values, database, table)
    }

    /**
     *
     * @param query query string, where you can use %d for database and %t for table
     * @param values array of values to replace ? in query string
     * @param database replace %d if provided as string, if provided as array, it will replace %d0, %d1, %d2, ...
     * @param table replace %t if provided as string, if provided as array, it will replace %t0, %t1, %t2, ...
     * @returns returns affected rows
     */
    async delete({ query, values, database, table }: Data) {
        return this.query<DeleteResponse>(query, values, database, table)
    }

    /**
     *
     * @param query query string, where you can use %d for database and %t for table
     * @param values array of values to replace ? in query string
     * @param database replace %d if provided as string, if provided as array, it will replace %d0, %d1, %d2, ...
     * @param table replace %t if provided as string, if provided as array, it will replace %t0, %t1, %t2, ...
     * @returns returns affected rows
     */
    async update({ query, values, database, table }: Data) {
        return this.query<UpdateResponse>(query, values, database, table)
    }

    async close() {
        if (this.connection === null || !this.connected) return
        this.connection.end()
        this.connected = false
    }
}

export type Data = {
    query: string
    values?: Array<unknown>
    database?: string | string[]
    table?: string | string[]
}

export type InsertResponse = {
    affectedRows: number
    insertId: number
    warningStatus: number
}
export type DeleteResponse = {
    affectedRows: number
    warningStatus: number
}
export type UpdateResponse = {
    affectedRows: number
    warningStatus: number
}
