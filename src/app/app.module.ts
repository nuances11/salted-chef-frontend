import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthInterceptor } from './service/shared/auth.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/page/includes/header/header.component';
import { PageAsideComponent } from './components/page/includes/page-aside/page-aside.component';
import { PageContentComponent } from './components/page/page-content/page-content.component';
import { PageHeaderComponent } from './components/page/includes/page-header/page-header.component';
import { PageComponent } from './components/page/page.component';
import { CapitalizedFirstLetterPipe } from './pipes/capitalized-first-letter.pipe';
import { ProfileModule } from './components/profile/profile.module';
import { InputComponent } from './components/input/input.component';
import { AddComponent } from './components/user/add/add.component';
import { ListComponent } from './components/user/list/list.component';
import { ResultComponent } from './components/result/result.component';
import { CurrentComponent } from './components/chef/current/current.component';
import { DatabaseComponent } from './components/chef/database/database.component';
import { DataTablesModule } from 'angular-datatables';
import { EditComponent } from './components/user/edit/edit.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChefUploadComponent } from './components/chef/chef-upload/chef-upload.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { ZipcodeRangeDirective } from './directives/zipcode-range.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddChefComponent } from './components/chef/add-chef/add-chef.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HeaderComponent,
    PageAsideComponent,
    PageContentComponent,
    PageHeaderComponent,
    PageComponent,
    CapitalizedFirstLetterPipe,
    InputComponent,
    AddComponent,
    ListComponent,
    ResultComponent,
    CurrentComponent,
    DatabaseComponent,
    EditComponent,
    ChefUploadComponent,
    ZipcodeRangeDirective,
    AddChefComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileModule,
    DataTablesModule,
    AgGridModule.withComponents([]),
    NgxCsvParserModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
