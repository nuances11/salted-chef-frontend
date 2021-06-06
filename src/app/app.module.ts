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

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    ProfileComponent,
    HeaderComponent,
    PageAsideComponent,
    PageContentComponent,
    PageHeaderComponent,
    PageComponent,
    CapitalizedFirstLetterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
