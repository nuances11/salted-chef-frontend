import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStateService } from 'src/app/service/shared/auth-state.service';
import { AuthService } from 'src/app/service/shared/auth.service';
import { TokenService } from 'src/app/service/shared/token.service';

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
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  isSignedIn?: boolean;
  user?: User;
  return: string = '';
  loginForm: FormGroup;
  errors = {
    email: null,
    password: null,
    error: null
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService) {
    this.loginForm = this.fb.group({
      email: [],
      password: []
    })

    this.authState.userAuthState.subscribe(val => {
        this.isSignedIn = val;
        console.log('isSignedIn', this.isSignedIn);
    });

  }

  ngOnInit(): void {
    // Get the query params
    this.route.queryParams
    .subscribe(params => this.return = params['return'] || '/profile');
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
        this.loginForm.reset();
        window.location.replace("/zipcode/input");
        // this.router.navigate(['/zipcode/input'])
        //   .then(() => {
        //     window.location.reload();
        // });
      }
    );
}

// Handle response
responseHandler(data: any){
  this.token.handleData(data);
}

}
