import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import graphql from 'graphql-tag';
import { RepositoriesQueryResult } from '../models/query/repositories-query-result.model';
import { RepositoryQueryResult } from '../models/query/repository-query-result.model';
import { Repository } from '../models/repository.model';
import { Subject } from 'rxjs';
import { UpdateRepositoryInput } from '../models/mutation/update-repository-input.model';
import { CreateRepositoryInput } from '../models/mutation/create-repository-input.model';
import AlertService from './alert.service';
import List from '../models/list.model';
import { PAGE_SIZE } from '../helpers/constants';

const GET_REPOSITORIES_QUERY = graphql`
query getRepositories ($firstLimit: Int $lastLimit:Int $beforeCursor:String $afterCursor:String){
  viewer{
    id,
    repositories(first:$firstLimit last:$lastLimit before:$beforeCursor after: $afterCursor){
      nodes{
        name,
        description,
        id,
        isPrivate
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

const GET_REPOSITORY_QUERY = graphql`
query getRepository ($name:String!){
  viewer{
    id,
    repository(name:$name){
      name,
      description,
      id,
      isPrivate
    }
  }
}`;

const ADD_REPOSITORY_MUTATION = graphql`
mutation addRepository($repository: CreateRepositoryInput!){
  createRepository(input: $repository){
    repository{
      name,
      description,
      id,
      isPrivate
    }
  }
}`;

const UPADTE_REPOSITORY_MUTATION = graphql`
mutation updateRepository($repository: UpdateRepositoryInput!){
  updateRepository(input: $repository){
    repository{
      name,
      description,
      id,
      isPrivate
    }
  }
}
`;

@Injectable({ providedIn: 'root' })
export default class RepositoryService {

  private repositories: Subject<List<Repository>> = new Subject<List<Repository>>();
  private repository: Subject<Repository> = new Subject<Repository>();

  constructor(private apollo: Apollo, private alertService: AlertService) { }

  getRepository(name: string) {
    this.apollo.query({
      query: GET_REPOSITORY_QUERY,
      variables: { name: name },
      fetchPolicy:'no-cache'
    }).subscribe(
      result => { this.repository.next((result.data as RepositoryQueryResult).viewer.repository) },
      error => { this.alertService.error(error) });

    return this.repository;
  }

  getRepositories(before: string = null, after: string = null) {
    this.apollo.query({
      query: GET_REPOSITORIES_QUERY,
      variables: { firstLimit: (after || (!before && !after)) ? PAGE_SIZE : null, lastLimit: before ? PAGE_SIZE : null, beforeCursor: before, afterCursor: after },
      fetchPolicy: 'no-cache'
    }).subscribe(
      result => {
        const data = result.data as RepositoriesQueryResult; this.repositories.next({
          values: data.viewer.repositories.nodes,
          startCursor: data.viewer.repositories.pageInfo.startCursor,
          endCursor: data.viewer.repositories.pageInfo.endCursor,
          hasNextPage: data.viewer.repositories.pageInfo.hasNextPage,
          hasPreviousPage: data.viewer.repositories.pageInfo.hasPreviousPage
        });
      },
      error => { this.alertService.error(error) });

    return this.repositories;
  }

  addRepository(repository: CreateRepositoryInput) {
    this.apollo.mutate({
      mutation: ADD_REPOSITORY_MUTATION,
      variables: { repository: repository }
    }).subscribe(
      result => { this.repository.next((result.data as { createRepository: { repository: Repository } }).createRepository.repository); },
      error => { this.alertService.error(error) });

    return this.repository;
  }

  updateRepository(repository: UpdateRepositoryInput) {
    this.apollo.mutate({
      mutation: UPADTE_REPOSITORY_MUTATION,
      variables: { repository: repository }
    }).subscribe(
      result => { this.repository.next((result.data as { updateRepository: { repository: Repository } }).updateRepository.repository); },
      error => { this.alertService.error(error) });

    return this.repository;
  }
}