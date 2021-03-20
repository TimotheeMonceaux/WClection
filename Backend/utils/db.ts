import { hash } from 'bcrypt';

function jsFieldToColumnName(key: string): string {
    return `"${key.charAt(0).toUpperCase() + key.slice(1)}"`;
}

function escapeString(value: any): string {
    return (typeof value === 'string' ? `'${value}'` : `${value}`);
}

export function getInsertParameters(table: string, data: any):  {table: string, data: Array<[string, string]>} {
    return {
        table: table, 
        data: Object.keys(data).filter(key => data[key] !== undefined)
                              .map(key => [jsFieldToColumnName(key), data[key]])
    }
}

export async function hashPassword(pwd: string): Promise<string> {
    return await hash(pwd, 10);
}