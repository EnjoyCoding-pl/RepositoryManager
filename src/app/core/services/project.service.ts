import { Injectable } from "@angular/core";
import { Apollo } from 'apollo-angular';
import graphql from 'graphql-tag';
import { Subject } from 'rxjs';
import Project from '../models/project.model';
import CreateProjectInput from '../models/mutation/create-project-input.model';
import UpdateProjectInput from '../models/mutation/update-project-input.model';
import AlertService from './alert.service';
import { PAGE_SIZE } from '../helpers/constants';
import { ProjectsQueryResult } from '../models/query/projects-query-result.model';
import List from '../models/list.model';
import ProjectQueryResult from '../models/query/project-query-result.model';

const GET_PROJECTS_QUERY = graphql`
query getProjects ($firstLimit:Int $lastLimit:Int $beforeCursor:String $afterCursor:String) { 
    viewer {
      id, 
      projects(first:$firstLimit last:$lastLimit before:$beforeCursor after:$afterCursor){
        nodes{
          name,
          body,
          number,
          id
        },
        pageInfo{
          startCursor
          endCursor,
          hasPreviousPage,
          hasNextPage
        }
      }
    }
  }`;

const GET_PROJECT_QUERY = graphql`
query getProjects($number: Int!) { 
    viewer {
      id, 
      project(number:$number){
        name,
        body,
        number,
        id
      }
    }
  }`;

const ADD_PROJECT_MUTATION = graphql`
mutation addProject($project:CreateProjectInput!){
    createProject(input:$project){
      project{
        name,
        body,
        number
      }
    }
  }`;

const UPDATE_PROJECT_MUTATION = graphql`
mutation updateProject($project: UpdateProjectInput!){
    updateProject(input:$project){
      project{
        body,
        name,
        number
      }
    }
  }`;

const DELETE_PROJECT_MUTATION = graphql`
  mutation deleteProject($project:DeleteProjectInput!){
    deleteProject(input:$project){
      clientMutationId
    }
  }`;


@Injectable({ providedIn: 'root' })
export default class ProjectService {

  private project: Subject<Project> = new Subject<Project>();
  private projects: Subject<List<Project>> = new Subject<List<Project>>();
  private delete = new Subject();

  constructor(private apollo: Apollo, private alertService: AlertService) { }

  getProjects(beforeCursor: string = null, afterCursor: string = null) {
    this.apollo.query({
      query: GET_PROJECTS_QUERY,
      variables: { firstLimit: afterCursor || (!afterCursor && !beforeCursor) ? PAGE_SIZE : null, lastLimit: beforeCursor ? PAGE_SIZE : null, beforeCursor: beforeCursor, afterCursor: afterCursor },
      fetchPolicy: 'no-cache'
    }).subscribe(
      result => {
        const data = result.data as ProjectsQueryResult;
        this.projects.next({
          values: data.viewer.projects.nodes,
          endCursor: data.viewer.projects.pageInfo.endCursor,
          startCursor: data.viewer.projects.pageInfo.startCursor,
          hasNextPage: data.viewer.projects.pageInfo.hasNextPage,
          hasPreviousPage: data.viewer.projects.pageInfo.hasPreviousPage
        });
      },
      error => { this.alertService.error(error) });

    return this.projects;
  }

  getProject(number: number) {
    this.apollo.query({
      query: GET_PROJECT_QUERY,
      variables: { number: number },
      fetchPolicy:'no-cache'
    }).subscribe(
      result => { this.project.next((result.data as ProjectQueryResult).viewer.project); },
      error => { this.alertService.error(error) });

    return this.project;
  }
  
  addProject(project: CreateProjectInput) {
    this.apollo.mutate({
      mutation: ADD_PROJECT_MUTATION,
      variables: { project: project }
    }).subscribe(
      result => { this.project.next((result.data as { createProject: { project: Project } }).createProject.project); },
      error => { this.alertService.error(error) });

    return this.project;
  }
  
  updateProject(project: UpdateProjectInput) {
    this.apollo.mutate({
      mutation: UPDATE_PROJECT_MUTATION,
      variables: { project: project }
    }).subscribe(
      result => { this.project.next((result.data as { updateProject: { project: Project } }).updateProject.project); },
      error => { this.alertService.error(error) });

    return this.project;
  }

  deleteProject(projectId: string) {
    this.apollo.mutate({
      mutation: DELETE_PROJECT_MUTATION,
      variables: { project: { projectId } }
    }).subscribe(
      _ => { this.delete.next(); },
      error => { this.alertService.error(error) });

    return this.delete;
  }
}