export const parseQuery = (query: string): string => {
    return encodeURIComponent(query).replace(/%20/g, '+');
}