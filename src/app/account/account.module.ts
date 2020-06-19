import { NgModule } from '@angular/core';
import LoginComponent from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import AccountRoutingModule from './account-routing.module';
import ComponentModule from '../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [LoginComponent],
    imports: [ReactiveFormsModule, CommonModule, AccountRoutingModule, ComponentModule, TranslateModule]
})
export default class AccountModule { }