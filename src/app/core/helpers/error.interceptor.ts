import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import AccountService from '../services/account.service';

@Injectable()
export default class ErrorInterceptor implements HttpInterceptor {

    constructor(private accountService:AccountService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error) => {

            if (error.status === 401) {
                this.accountService.logout();
            }

            return throwError(error.message || error.statusText);
        }))
    }
}
