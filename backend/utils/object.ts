export function filterNullValues(o: any): any {
    return Object.keys(o).filter(key => o[key] !== undefined && o[key] !== null)
                         .reduce((agg, k) => ({...agg, [k]: o[k]}), {});
}