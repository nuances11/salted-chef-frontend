import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/service/shared/auth-state.service';
import { AuthService } from 'src/app/service/shared/auth.service';
import { TokenService } from 'src/app/service/shared/token.service';

// User interface
export class User {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  role_radable_name?: string;
  id?: string;
}

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  user?: User;
  isSignedIn?: boolean;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authService: AuthService
  ) {
    this.authService.profileUser().subscribe((data:any) => {
      this.user = data;
    })
  }

  ngOnInit(): void {
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login'])
    .then(() => {
      window.location.reload();
    });
  }

}
