import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/service/shared/auth-state.service';
import { AuthService } from 'src/app/service/shared/auth.service';
import { TokenService } from 'src/app/service/shared/token.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  errors = {
    email: null,
    password: null,
    error: null
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService) {
    this.loginForm = this.fb.group({
      email: [],
      password: []
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      (result: any) => {
        this.responseHandler(result);
      },
      (error: any) => {
        this.errors.email = error.error.email;
        this.errors.password = error.error.password;
        this.errors.error = error.error.error;
      },() => {
        this.authState.setAuthState(true);
        this.loginForm.reset()
        this.router.navigate(['profile']);
      }
    );
}

// Handle response
responseHandler(data: any){
  this.token.handleData(data.access_token);
}

}
