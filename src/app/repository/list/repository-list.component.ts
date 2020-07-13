import { Component, OnInit, OnDestroy } from '@angular/core';
import RepositoryService from 'src/app/core/services/repository.service';
import { Repository } from 'src/app/core/models/repository.model';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './repository-list.component.html',
    styleUrls: ['./repository-list.component.css'],
})
export default class RepositoryListComponent implements OnInit, OnDestroy {

    private getRepositoriesSubscription: Subscription;

    repositories: Repository[] = [];
    hasNextPage: boolean = false;
    hasPreviousPage: boolean = false;
    firstItemCursor: string;
    lastItemCursor: string;

    constructor(private repositoryService: RepositoryService) {}

    ngOnInit() {
        this.getRepositoriesSubscription = this.repositoryService.getRepositories().subscribe(result => {
            this.repositories = result.values;
            this.hasPreviousPage = result.hasPreviousPage;
            this.hasNextPage = result.hasNextPage;
            this.firstItemCursor = result.startCursor;
            this.lastItemCursor = result.endCursor;
        });
    }

    onClickNextPage() {
        this.repositoryService.getRepositories(null, this.lastItemCursor);
    }

    onClickPreviousPage() {
        this.repositoryService.getRepositories(this.firstItemCursor, null);
    }

    ngOnDestroy(): void {
        this.getRepositoriesSubscription.unsubscribe();
    }
}