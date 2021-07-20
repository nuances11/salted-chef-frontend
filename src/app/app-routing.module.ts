import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardGuard } from './auth/admin-auth-guard.guard';
import { AuthGuard } from './auth/auth.guard';
import { ChefDatabaseAuthGuardGuard } from './auth/chef-database-auth-guard.guard';
import { ChefSearchAuthGuardGuard } from './auth/chef-search-auth-guard.guard';
import { HumanResourceAuthGuardGuard } from './auth/human-resource-auth-guard.guard';
import { HumanResourceManagerAuthGuardGuard } from './auth/human-resource-manager-auth-guard.guard';
import { LoggedInAuthGuard } from './auth/logged-in-auth.guard';
import { AddChefComponent } from './components/chef/add-chef/add-chef.component';
import { ChefUploadComponent } from './components/chef/chef-upload/chef-upload.component';
import { CurrentComponent } from './components/chef/current/current.component';
import { DatabaseComponent } from './components/chef/database/database.component';
import { InputComponent } from './components/input/input.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileModule} from './components/profile/profile.module';
import { ResultComponent } from './components/result/result.component';
import { AddComponent } from './components/user/add/add.component';
import { EditComponent } from './components/user/edit/edit.component';
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
    canActivate: [AuthGuard],
    data: {
      title: 'Main',
      description: 'Zipcode Input'
    }
  },
  {
    path: 'zipcode/result',
    component: ResultComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Main',
      description: 'Zipcode Result'
    }
  },
  {
    path: 'chef/database',
    component: DatabaseComponent,
    canActivate: [ChefDatabaseAuthGuardGuard, AuthGuard],
    data: {
      title: 'Database',
      description: 'Chef to Screen'
    }
  },
  {
    path: 'chef/current',
    component: CurrentComponent,
    canActivate: [ChefDatabaseAuthGuardGuard, AuthGuard],
    data: {
      title: 'Database',
      description: 'Current Chef'
    }
  },
  {
    path: 'chef/upload',
    component: ChefUploadComponent,
    canActivate: [ChefDatabaseAuthGuardGuard, AuthGuard],
    data: {
      title: 'Database',
      description: 'Chef Database Upload'
    }
  },
  {
    path: 'chef/add',
    component: AddChefComponent,
    canActivate: [ChefDatabaseAuthGuardGuard, AuthGuard],
    data: {
      title: 'Database',
      description: 'Add Chef'
    }
  },
  {
    path: 'user/add',
    component: AddComponent,
    canActivate: [AdminAuthGuardGuard, AuthGuard],
    data: {
      title: 'System Users',
      description: 'Add User'
    }
  },
  {
    path: 'user/list',
    component: ListComponent,
    canActivate: [AdminAuthGuardGuard, AuthGuard],
    data: {
      title: 'System Users',
      description: 'User List'
    }
  },
  {
    path: 'user/get/:id',
    component: EditComponent,
    canActivate: [AdminAuthGuardGuard, AuthGuard],
    data: {
      title: 'System Users',
      description: 'Edit User'
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
