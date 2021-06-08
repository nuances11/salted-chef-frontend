import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/shared/auth.service';

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
