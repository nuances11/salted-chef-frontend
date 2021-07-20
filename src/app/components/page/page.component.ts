import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/service/shared/auth-state.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  isSignedIn?: boolean;

  constructor(private auth: AuthStateService) { }

  ngOnInit(): void {

    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });
  }

}
