import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }
    this.authService.redirectUrl = url;

    this.router.navigate(['/auth/login']);
    return false;
}
}
