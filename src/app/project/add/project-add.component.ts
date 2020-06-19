import { Component, OnInit, OnDestroy } from '@angular/core';
import ProjectService from 'src/app/core/services/project.service';
import { FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Repository } from 'src/app/core/models/repository.model';
import RepositoryService from 'src/app/core/services/repository.service';
import AccountService from 'src/app/core/services/account.service';
import AlertService from 'src/app/core/services/alert.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: './project-add.component.html',
    styleUrls: ['./project-add.component.css']
})
export default class ProjectAddComponent implements OnInit, OnDestroy {

    private subscription: Subscription[] = [];
    private userId: number;

    projectAddFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        number: [''],
        repositoryIds: new FormArray([])
    });
    repositories: Repository[] = [];
    hasNextPage: boolean;
    endCursor: string;

    constructor(
        private projectService: ProjectService,
        private repositoryService: RepositoryService,
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private translationService: TranslateService) { }

    ngOnInit(): void {
        this.subscription.push(this.repositoryService.getRepositories().subscribe(data => {
            this.repositories = this.repositories.concat(data.values);
            this.hasNextPage = data.hasNextPage;
            this.endCursor = data.endCursor;

            data.values.forEach(_ => {
                (this.projectAddFormGroup.controls.repositoryIds as FormArray).push(new FormControl())
            })
        }));

        this.subscription.push(this.accountService.getLoggerUserId().subscribe(data => this.userId = data));
    }

    onSubmit(): void {
        if (this.projectAddFormGroup.valid) {

            const repositoryIds: string[] = [];

            this.projectAddFormGroup.value.repositoryIds.forEach((item, index) => {
                if (item) {
                    repositoryIds.push(this.repositories[index].id);
                }
            });

            this.subscription.push(this.projectService.addProject({
                ownerId: this.userId,
                name: this.projectAddFormGroup.value.name,
                body: this.projectAddFormGroup.value.description,
                repositoryIds: repositoryIds

            }).subscribe(data => {
                this.router.navigate(['project', 'edit', data.number]);
                this.alertService.success(this.translationService.instant('PROJECT.ADDED'))
            }));
        }
    }

    onClickNextPage() {
        this.repositoryService.getRepositories(null, this.endCursor);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(x => x.unsubscribe());
    }
}