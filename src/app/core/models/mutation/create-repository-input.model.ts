import { RepositoryVisibility } from '../repository-visibility.enum';

export interface CreateRepositoryInput {
    name: string,
    description: string,
    visibility: RepositoryVisibility
}