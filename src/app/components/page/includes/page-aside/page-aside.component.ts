import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/service/shared/auth-state.service';
import { AuthService } from 'src/app/service/shared/auth.service';
import { TokenService } from 'src/app/service/shared/token.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-page-aside',
  templateUrl: './page-aside.component.html',
  styleUrls: ['./page-aside.component.scss']
})
export class PageAsideComponent implements OnInit {

  user?: User;

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

}
