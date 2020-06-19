import { Routes, RouterModule } from '@angular/router';
import RepositoryListComponent from './list/repository-list.component';
import RepositoryEditComponent from './edit/repository-edit.component';
import { NgModule } from '@angular/core';
import RepositoryAddComponent from './add/repository-add.component';


const routes: Routes = [
    { path: '', component: RepositoryListComponent },
    { path: 'edit/:repositoryName', component: RepositoryEditComponent },
    { path: 'add', component: RepositoryAddComponent }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export default class RepositoryRoutingModule{}