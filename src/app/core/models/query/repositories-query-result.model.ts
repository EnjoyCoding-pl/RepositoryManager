import { Repository } from '../repository.model';

export interface RepositoriesQueryResult {
    viewer: {
        repositories: {
            nodes: Repository[],
            pageInfo: {
                startCursor: string,
                endCursor: string,
                hasPreviousPage: boolean,
                hasNextPage: boolean
            },
        }
    }
}