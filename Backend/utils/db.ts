import { hash } from 'bcrypt';

function jsFieldToColumnName(key: string): string {
    return `"${key.charAt(0).toUpperCase() + key.slice(1)}"`;
}

export function getInsertParameters(data: any): Array<[string, string]> {
    return Object.keys(data).filter(key => key.toLowerCase() !== 'id' && key !== 'TABLE_NAME' && data[key] !== undefined)
                               .map(key => [jsFieldToColumnName(key), data[key]]);
}

export async function hashPassword(pwd: string): Promise<string> {
    return await hash(pwd, 10);
}