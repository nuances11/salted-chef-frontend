import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoggedInAuthGuard } from './auth/logged-in-auth.guard';
import { CurrentComponent } from './components/chef/current/current.component';
import { DatabaseComponent } from './components/chef/database/database.component';
import { InputComponent } from './components/input/input.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileModule} from './components/profile/profile.module';
import { ResultComponent } from './components/result/result.component';
import { AddComponent } from './components/user/add/add.component';
import { ListComponent } from './components/user/list/list.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LogInComponent,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // loadChildren: () =>import('../app/components/profile/profile.module').then((m) =>m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'zipcode/input',
    component: InputComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'zipcode/result',
    component: ResultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chef/database',
    component: DatabaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chef/current',
    component: CurrentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/add',
    component: AddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/list',
    component: ListComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
