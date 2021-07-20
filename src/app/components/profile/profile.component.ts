import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  profileForm: FormGroup;
  hasErrors? = null;
  errors = {
    first_name:null,
    last_name:null,
    email: null,
    old_password: null,
    new_password: null,
    new_password_confirmation: null,
    error: false
  };
  showAlert: boolean = false;
  alertString: string = '';
  errString: string = '';

  constructor(
    public authService: AuthService,
    public fb: FormBuilder
    ) {

    this.profileForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      old_password: [''],
      new_password: [''],
      new_password_confirmation: ['']
    })

    this.authService.profileUser().subscribe((data:any) => {
      this.user = data;
      this.profileForm?.patchValue({
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      })
    })
  }

  ngOnInit(): void {

  }

  isJsonString(str: any) {
    try {
      var json = JSON.parse(str);
      return (typeof json === 'object');
    } catch (e) {
      return false;
    }
  }

  resetErrors() {
    this.errString = '';
    this.hasErrors = null;
    this.errors = {
      first_name:null,
      last_name:null,
      email: null,
      old_password: null,
      new_password: null,
      new_password_confirmation: null,
      error: false
    };
  }

  onSubmit() {
    if (this.user) {
      this.resetErrors();
      this.authService.updateProfile(this.user.id, this.profileForm.value).subscribe(
        result => {
          console.log(result)
        },
        error => {
          console.log(error);
          this.hasErrors = error;
          if (error.error && this.isJsonString(error.error)) {
            this.errors.first_name = (JSON.parse(error.error).first_name) ? JSON.parse(error.error).first_name[0] : '';
            this.errors.last_name = (JSON.parse(error.error).last_name) ? JSON.parse(error.error).last_name[0] : '';
            this.errors.email = (JSON.parse(error.error).email) ? JSON.parse(error.error).email[0] : '';
            this.errors.old_password = JSON.parse(error.error).old_password;
            this.errors.new_password = JSON.parse(error.error).new_password;
            this.errors.new_password = (JSON.parse(error.error).new_password) ? JSON.parse(error.error).new_password : '';
            this.errors.new_password_confirmation = (JSON.parse(error.error).new_password_confirmation) ? JSON.parse(error.error).new_password_confirmation : '';
            this.errors.error = (JSON.parse(error.error).error) ? JSON.parse(error.error).error[0] : '';
          }else{
            this.errString = error.error.message;
          }
        },
        () => {
          this.profileForm.controls['old_password'].reset()
          this.profileForm.controls['new_password'].reset()
          this.profileForm.controls['new_password_confirmation'].reset()
          this.showAlert = true;
          this.alertString = 'Profile Updated Successfully!'
          // this.router.navigate(['login']);
          window.location.reload();
        }
      )
    }

  }

}
