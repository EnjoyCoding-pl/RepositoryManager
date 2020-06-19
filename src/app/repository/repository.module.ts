import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import RepositoryEditComponent from './edit/repository-edit.component';
import RepositoryListComponent from './list/repository-list.component';
import { CommonModule } from '@angular/common';
import RepositoryRoutingModule from './repository-routing.module';
import ComponentModule from '../components/components.module';
import RepositoryAddComponent from './add/repository-add.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [ReactiveFormsModule, CommonModule, RepositoryRoutingModule, ComponentModule, TranslateModule],
    declarations: [RepositoryEditComponent, RepositoryAddComponent, RepositoryListComponent],
})
export default class RepositoryEditModule { }