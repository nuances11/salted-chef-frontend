import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/shared/auth.service';
import { User } from 'src/app/user';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id: any;
  user?: User;
  isDisabled: boolean = true;
  isAdmin: boolean = false;
  currUser?: any;
  hasErrors? = null;
  errors = {
    first_name:null,
    last_name:null,
    password: null,
    password_confirmation: null,
    error: false
  };
  showAlert: boolean = false;
  alertString: string = '';


  constructor(
    public authService: AuthService,
    private route: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getUser();
    this.checkCurrentUserId();
  }

  getUser() {
    this.authService.getUser(this.id).subscribe( res => {
      this.user = res;
    })
  }

  checkCurrentUserId() {
    this.authService.profileUser().subscribe((data:any) => {
      this._isAdmin(data.id);
      return data.id;
    })
  }

  _isAdmin(id: any) {

    if ( id === 1) {
      this.isAdmin = true;
      return this.isAdmin;
    }

    return this.isAdmin;
  }

  updateUser() {
    if (this.user) {
      this.authService.updateUser(this.id, this.user).subscribe(
        result => {
          console.log(result)
        },
        error => {
          this.hasErrors = error;
          this.errors.first_name = (JSON.parse(error.error).first_name) ? JSON.parse(error.error).first_name[0] : '';;
          this.errors.last_name = (JSON.parse(error.error).last_name) ? JSON.parse(error.error).last_name[0] : '';;
          this.errors.password = JSON.parse(error.error).password[0];
          this.errors.password_confirmation = (JSON.parse(error.error).password_confirmation) ? JSON.parse(error.error).password_confirmation[0] : '';
          this.errors.error = (JSON.parse(error.error).error) ? JSON.parse(error.error).error[0] : '';
        },
        () => {
          this.showAlert = true;
          this.alertString = 'User Created Successfully!'
          // this.router.navigate(['login']);
        }
      )
    }

  }

}
