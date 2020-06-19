import { Repository } from '../repository.model';

export interface RepositoryQueryResult {
    viewer: {
        repository: Repository
    }
}