export default interface List<T> {
    values: T[],
    startCursor: string,
    endCursor: string,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}