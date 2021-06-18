import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from './service/shared/auth-state.service';
import { TokenService } from './service/shared/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chef-frontend';
  isSignedIn?: boolean;
  isJqueryWorking: any;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService
  ) {

  }

  ngOnInit(): void {
    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
    });
  }

   // Signout
   signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }
}
