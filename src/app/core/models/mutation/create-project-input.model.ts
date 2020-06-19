export default interface CreateProjectInput {
    ownerId: number,
    name: string,
    body: string,
    repositoryIds: string[]
}