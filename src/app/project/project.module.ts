import { NgModule } from '@angular/core';
import ProjectEditComponent from './edit/project-edit.component';
import ProjectListComponent from './list/project-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import ProjectRoutingModule from './project-routing.module';
import ComponentModule from '../components/components.module';
import ProjectAddComponent from './add/project-add.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [ProjectEditComponent, ProjectListComponent, ProjectAddComponent],
    imports: [CommonModule, ReactiveFormsModule, ProjectRoutingModule, ComponentModule, TranslateModule]
})
export default class ProjectModule { }