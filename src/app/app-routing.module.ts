import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './core/helpers/authentication.guard';

const repositoryModule = () => import('./repository/repository.module').then(x => x.default);
const accountModule = () => import('./account/account.module').then(x => x.default);
const projectModule = () => import('./project/project.module').then(x => x.default);

const routes: Routes = [
  { path: '', redirectTo: 'repository', pathMatch: 'full' },
  { path: 'repository', loadChildren: repositoryModule, canActivate: [AuthenticationGuard], runGuardsAndResolvers: 'always' },
  { path: 'project', loadChildren: projectModule, canActivate: [AuthenticationGuard], runGuardsAndResolvers: 'always' },
  { path: 'login', loadChildren: accountModule },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
