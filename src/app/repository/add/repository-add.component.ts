import RepositoryService from '../../core/services/repository.service';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryVisibility } from 'src/app/core/models/repository-visibility.enum';
import { CreateRepositoryInput } from 'src/app/core/models/mutation/create-repository-input.model';
import AlertService from 'src/app/core/services/alert.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: './repository-add.component.html',
    styleUrls: ['./repository-add.component.css']
})
export default class RepositoryAddComponent implements OnDestroy {

    private addRepositorySubscription: Subscription;

    repositoryAddFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        repositoryId: [''],
        visibility: [RepositoryVisibility.PRIVATE]
    });
    visibilityTypes = Object.keys(RepositoryVisibility);

    constructor(
        private repositoryService: RepositoryService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private translationService: TranslateService
    ) { }

    onSubmit() {
        if (this.repositoryAddFormGroup.valid) {

            const repository: CreateRepositoryInput = {
                description: this.repositoryAddFormGroup.value.description,
                name: this.repositoryAddFormGroup.value.name,
                visibility: this.repositoryAddFormGroup.value.visibility
            };
            
            this.addRepositorySubscription = this.repositoryService.addRepository(repository).subscribe(
                data => { this.router.navigate(['repository', 'edit', data.name]); this.alertService.success(this.translationService.instant('REPOSITORY.ADDED')); });
        }
    }

    ngOnDestroy(): void {
        if (this.addRepositorySubscription) {
            this.addRepositorySubscription.unsubscribe();
        }
    }
}