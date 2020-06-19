import RepositoryService from '../../core/services/repository.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateRepositoryInput } from 'src/app/core/models/mutation/update-repository-input.model';
import AlertService from 'src/app/core/services/alert.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: './repository-edit.component.html',
    styleUrls: ['./repository-edit.component.css']
})
export default class RepositoryEditComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];
    
    repositoryEditFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        repositoryId: ['']
    });

    constructor(
        private repositoryService: RepositoryService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private translationService: TranslateService
    ) { }
    
    ngOnInit() {
        this.subscriptions.push(this.route.paramMap.subscribe(params => {
            if (params.has('repositoryName')) {

                this.subscriptions.push(this.repositoryService.getRepository(params.get('repositoryName')).subscribe(data => {
                    this.repositoryEditFormGroup.patchValue({
                        name: data.name,
                        description: data.description,
                        repositoryId: data.id
                    });
                }));
            }
        }))
    }

    onSubmit() {
        if (this.repositoryEditFormGroup.valid) {
            
            const repository: UpdateRepositoryInput = {
                description: this.repositoryEditFormGroup.value.description,
                name: this.repositoryEditFormGroup.value.name,
                repositoryId: this.repositoryEditFormGroup.value.repositoryId
            };
            
            this.subscriptions.push(this.repositoryService.updateRepository(repository).subscribe(
                data => { this.router.navigate(['repository', 'edit', data.name]); this.alertService.success(this.translationService.instant('REPOSITORY.EDITED')); }));
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s=>s.unsubscribe());
    }
}