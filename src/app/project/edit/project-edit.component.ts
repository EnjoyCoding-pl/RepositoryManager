import { Component, OnInit, OnDestroy } from '@angular/core';
import ProjectService from 'src/app/core/services/project.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import AlertService from 'src/app/core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: './project-edit.component.html',
    styleUrls: ['./project-edit.component.css']
})
export default class ProjectEditComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    projectEditFormGroup = this.formBuilder.group({
        name: [''],
        description: [''],
        projectId: [''],
    });

    constructor(
        private projectService: ProjectService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private translationService: TranslateService) { }

    ngOnInit(): void {
        this.subscriptions.push(this.route.paramMap.subscribe(params => {
            if (params.has('projectNumber')) {

                this.subscriptions.push(this.projectService.getProject(parseInt(params.get('projectNumber'))).subscribe(data => {
                    this.projectEditFormGroup.patchValue({
                        name: data.name,
                        description: data.body,
                        projectId: data.id,
                    })
                }));
            }
        }));
    }

    onSubmit(): void {
        if (this.projectEditFormGroup.valid) {

            this.subscriptions.push(this.projectService.updateProject({
                name: this.projectEditFormGroup.value.name,
                body: this.projectEditFormGroup.value.description,
                projectId: this.projectEditFormGroup.value.projectId
            }).subscribe(data => {
                this.router.navigate(['project', 'edit', data.number]);
                this.alertService.success(this.translationService.instant('PROJECT.EDITED'));
            }));
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}