import { Component, OnInit, OnDestroy } from '@angular/core';
import Project from 'src/app/core/models/project.model';
import ProjectService from 'src/app/core/services/project.service';
import { Subscription } from 'rxjs';
import AlertService from 'src/app/core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.css']
})
export default class ProjectListComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    projects: Project[] = [];
    hasNextPage:boolean;
    hasPreviousPage:boolean;
    starCursor:string;
    endCursor:string;

    constructor(private projectService: ProjectService, private alertService: AlertService, private translationService: TranslateService) { }

    ngOnInit(): void {
        this.subscriptions.push(this.projectService.getProjects().subscribe(data => {
            this.projects = data.values;
            this.hasPreviousPage = data.hasPreviousPage;
            this.hasNextPage = data.hasNextPage;
            this.starCursor = data.startCursor;
            this.endCursor = data.endCursor;
        }));
    }

    onClickPreviousPage(){
        this.projectService.getProjects(this.starCursor, null);
    }
    
    onClickNextPage(){
        this.projectService.getProjects(null, this.endCursor);
    }

    onDelete(project: Project) {
        this.subscriptions.push(this.projectService.deleteProject(project.id).subscribe(_ => {
            this.ngOnInit();
            this.alertService.success(this.translationService.instant('PROJECT.DELETED'));
        }));
    }
    
    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}