import Project from '../project.model';

export default interface ProjectQueryResult {
    viewer: {
        project: Project
    }
}