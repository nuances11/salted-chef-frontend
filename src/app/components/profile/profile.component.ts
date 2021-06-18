import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/shared/auth.service';
import { User } from 'src/app/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user?: User;
  isDisabled: boolean = true;

  constructor(public authService: AuthService) {
    this.authService.profileUser().subscribe((data:any) => {
      this.user = data;
    })
  }

  ngOnInit(): void {
  }

}
