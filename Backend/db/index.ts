import { Pool } from 'pg';

const pool =new Pool();
pool.connect();

export async function query<T>(text: string, values: Array<string>): Promise<Array<T>> {
    const start = Date.now();
    const result = await pool.query(text, values);
    const duration = Date.now() - start;
    console.log('[INFO] Query: ', {text, duration, rows: result.rowCount});
    pool.end();
    return result.rows;
}

export async function querySingle<T>(text: string, values: Array<string>): Promise<T> {
    const start = Date.now();
    const result = await pool.query(text, values);
    const duration = Date.now() - start;

    if (result.rowCount > 1)
        console.log('[ERROR] Too many rows for QuerySingle: ', {text, duration, rows: result.rowCount})
    else 
        console.log('[INFO] Query: ', {text, duration, rows: result.rowCount});
        
    pool.end();
    return result.rows[0];
}