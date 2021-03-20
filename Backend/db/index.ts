import { Pool } from 'pg';

const pool = new Pool();
pool.connect();

export async function query<T>(text: string, values: Array<string>): Promise<Array<T>> {
    const start = Date.now();
    const result = await pool.query(text, values);
    const duration = Date.now() - start;
    console.log('[INFO] Query: ', {text, duration, rows: result.rowCount});
    pool.end();
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

export async function insert(table: string, data: Array<[string, string]>): Promise<boolean> {
    const start = Date.now();
    const result = await pool.query(`INSERT INTO ${table} (${data.map(t => t[0]).join(', ')}) VALUES (${data.map((t, i) => `\$${i+1}`).join(', ')});`, data.map(t => t[1]));
    const duration = Date.now() - start;
    console.log('[INFO] Query: ', {text: `INSERT INTO ${table}`, duration, rows: result.rowCount});
    return result.rowCount === 1;
}