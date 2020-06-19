import Project from '../project.model';

export interface ProjectsQueryResult {
    viewer: {
        projects: {
            nodes: Project[],
            pageInfo: {
                startCursor: string,
                endCursor: string,
                hasPreviousPage: boolean,
                hasNextPage: boolean
            },
        }
    }
}