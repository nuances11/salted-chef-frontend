import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/shared/auth.service';
import { TokenService } from '../service/shared/token.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class ChefSearchAuthGuardGuard implements CanActivate {

  user?: User;
  public _role?: any;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    public authService: AuthService) {

    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
      const role = ['human_resource_manager', 'human_resource', 'administrator'];

      return this.checkUserRole(role);
  }

  checkUserRole(role: Array<any>){

    this.authService.profileUser().subscribe((data:any) => {
      this._role = data.role;
    })

    if (role.includes(this._role)) {
      return true;
    }

    // Redirect to the login page
    return this.router.parseUrl('/zipcode/input');
  }

}
