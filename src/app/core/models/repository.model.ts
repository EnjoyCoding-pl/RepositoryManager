import { RepositoryVisibility } from './repository-visibility.enum';

export interface Repository {
    name: string,
    description: string,
    visibility: RepositoryVisibility,
    id: string,
    isPrivate:boolean
}