import { Pool } from 'pg';
import Log from '../models/common/log';

const pool = new Pool();
pool.connect();

export interface IDbObject {
    readonly TABLE_NAME: string
    getInsertParameters(): Array<[string, string]>
}

export async function query(text: string, values: Array<string> = []): Promise<Array<any>> {
    const start = Date.now();
    const result = await pool.query(text, values);
    const duration = Date.now() - start;
    console.log('[INFO] Query: ', {text, duration, rows: result.rowCount});
    return result.rows;
}

export async function querySingle(text: string, values: Array<string>): Promise<any> {
    const start = Date.now();
    const result = await pool.query(text, values);
    const duration = Date.now() - start;

    if (result.rowCount > 1)
        console.log('[ERROR] Too many rows for QuerySingle: ', {text, duration, rows: result.rowCount})
    else 
        console.log('[INFO] Query: ', {text, duration, rows: result.rowCount});

    return result.rows[0];
}

export async function insert(obj: IDbObject): Promise<boolean> {
    const params = obj.getInsertParameters();
    const start = Date.now();
    const result = await pool.query(`INSERT INTO ${obj.TABLE_NAME} (${params.map(t => t[0]).join(', ')}) VALUES (${params.map((t, i) => `\$${i+1}`).join(', ')});`, params.map(t => t[1]));
    const duration = Date.now() - start;
    console.log('[INFO] Query: ', {text: `INSERT INTO ${obj.TABLE_NAME}`, duration, rows: result.rowCount});
    return result.rowCount === 1;
}

export async function log(type: string, user: string | undefined = undefined, result: string | undefined = undefined, extraParameters: any = undefined): Promise<boolean> {
    return insert(new Log(type, user, result, JSON.stringify(extraParameters)));
}