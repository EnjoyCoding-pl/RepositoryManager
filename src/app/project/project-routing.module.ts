import { Routes, RouterModule } from "@angular/router";
import ProjectEditComponent from './edit/project-edit.component';
import ProjectListComponent from './list/project-list.component';
import { NgModule } from '@angular/core';
import ProjectAddComponent from './add/project-add.component';


const routes: Routes = [
    { path: 'edit/:projectNumber', component: ProjectEditComponent },
    { path: 'add', component: ProjectAddComponent },
    { path: '', component: ProjectListComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export default class ProjectRoutingModule { }