import { Component } from '@angular/core';
import AccountService from '../core/services/account.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export default class LoginComponent {

    loginForm = this.formBuilder.group({
        token: ['', Validators.required]
    });

    constructor(private accountService: AccountService, private formBuilder: FormBuilder) { }

    onSubmit() {
        if (this.loginForm.valid) {
            this.accountService.login(this.loginForm.value)
        }
    }
}