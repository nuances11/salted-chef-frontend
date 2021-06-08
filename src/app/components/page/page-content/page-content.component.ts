import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/service/shared/auth-state.service';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit {

  isSignedIn?: boolean;

  constructor(private auth: AuthStateService) { }

  ngOnInit(): void {
    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
    });
  }

}
