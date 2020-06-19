import { Component } from '@angular/core';
import AccountService from './core/services/account.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLogged: boolean;
  
  constructor(private accountService: AccountService, public translate: TranslateService) {
    accountService.isLogged().subscribe(flag => this.isLogged = flag)
  }

  logout() {
    this.accountService.logout();
  }
}
