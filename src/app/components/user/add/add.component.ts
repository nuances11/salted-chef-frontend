import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/shared/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  registerForm: FormGroup;
  hasErrors? = null;
  errors = {
    first_name:null,
    last_name:null,
    email: null,
    password: null,
    password_confirmation: null,
    error: false
  };
  showAlert: boolean = false;
  alertString: string = '';

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      role: ['human_resource'],
      email: [''],
      password: [''],
      password_confirmation: ['']
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(
      result => {
        console.log(result)
      },
      error => {
        this.hasErrors = error;
        this.errors.first_name = (JSON.parse(error.error).first_name) ? JSON.parse(error.error).first_name[0] : '';;
        this.errors.last_name = (JSON.parse(error.error).last_name) ? JSON.parse(error.error).last_name[0] : '';;
        this.errors.email = (JSON.parse(error.error).email) ? JSON.parse(error.error).email[0] : '';;
        this.errors.password = JSON.parse(error.error).password[0];
        this.errors.password_confirmation = (JSON.parse(error.error).password_confirmation) ? JSON.parse(error.error).password_confirmation[0] : '';
        this.errors.error = (JSON.parse(error.error).error) ? JSON.parse(error.error).error[0] : '';
      },
      () => {
        this.registerForm.reset()
        this.showAlert = true;
        this.alertString = 'User Created Successfully!'
        // this.router.navigate(['login']);
      }
    )
  }

}
