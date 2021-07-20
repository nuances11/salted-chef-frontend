import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/service/shared/auth-state.service';
import { AuthService } from 'src/app/service/shared/auth.service';
import { PageService } from 'src/app/service/shared/page.service';
import { TokenService } from 'src/app/service/shared/token.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  user?: User;
  isSignedIn?: boolean;
  meta?: any;
  metaTitle?: any;
  metaDescription?: any;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authService: AuthService,
    public pageMeta: PageService
  ) {
    this.authService.profileUser().subscribe((data:any) => {
      this.user = data;
    })

    this.meta = this.pageMeta.getMeta();
    this.metaTitle = this.meta?.title;
    this.metaDescription = this.meta?.description;

  }

  ngOnInit(): void {
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    // this.router.navigate(['login'])
    window.location.replace("/login");
    // .then(() => {
    //   window.location.reload();
    // });
  }

}
