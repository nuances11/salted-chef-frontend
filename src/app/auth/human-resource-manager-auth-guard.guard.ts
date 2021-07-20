import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/shared/auth.service';
import { TokenService } from '../service/shared/token.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class HumanResourceManagerAuthGuardGuard implements CanActivate {
  user?: User;
  public _role?: any;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    public authService: AuthService) {
      this.authService.profileUser().subscribe((data:any) => {
        this._role = data.role;
      })
    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
      const role = 'human_resource_manager';
      return this.checkUserRole(role);
  }

  checkUserRole(role: string){
    console.log(this._role)
    if (role === this._role) {
      return true;
    }

    // Redirect to the login page
    return this.router.parseUrl('/zipcode/input');
  }

}
