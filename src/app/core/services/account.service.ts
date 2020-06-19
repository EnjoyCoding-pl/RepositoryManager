import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import graphql from 'graphql-tag';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TOKEN_KEY } from 'src/app/core/helpers/constants';

const GET_LOGGED_USER_ID_QUERY = graphql`
query getLoggedUserIdQuery{
    viewer{
        id
      }
}`;

@Injectable({
    providedIn: 'root'
})
export default class AccountService {

    private userId: Subject<number> = new Subject<number>();
    private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!localStorage.getItem(TOKEN_KEY));

    constructor(private apollo: Apollo, private router: Router, private route: ActivatedRoute) { }
    
    getLoggerUserId() {
        this.apollo.query({
            query: GET_LOGGED_USER_ID_QUERY
        }).subscribe(result => {
            this.userId.next((result.data as { viewer: { id: number } }).viewer.id);
        });

        return this.userId;
    }

    login(data: { token: string }) {
        localStorage.setItem(TOKEN_KEY, data.token);
        this.isLoggedSubject.next(true);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
    }

    isLogged() {
        return this.isLoggedSubject.asObservable();
    }
    
    logout() {
        localStorage.removeItem(TOKEN_KEY);
        this.isLoggedSubject.next(false);
        this.router.navigate(['login']);
    }
}