import { NgModule } from '@angular/core';
import RepositoryService from './services/repository.service';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import AccountService from './services/account.service';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import ProjectService from './services/project.service';
import ErrorInterceptor from './helpers/error.interceptor';
import { URI } from './helpers/constants';

const provideApollo = (httpLink: HttpLink) => {

    const auth = setContext((_, { headers }) => ({
        headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
        }
    }));

    return {
        link: ApolloLink.from([auth, httpLink.create({ uri: URI })]),
        cache: new InMemoryCache()
    };
}

@NgModule({
    imports: [ApolloModule, HttpLinkModule, HttpClientModule],
    providers: [
        RepositoryService,
        AccountService,
        ProjectService,
        { provide: APOLLO_OPTIONS, useFactory: provideApollo, deps: [HttpLink] },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ]
})
export default class CoreModule { }