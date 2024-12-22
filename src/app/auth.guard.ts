import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRoles: string[] = route.data['roles']; // Ensure this is an array
    const userRoles: string[] = JSON.parse(localStorage.getItem('roles') || '[]');

    // Check if user has at least one of the required roles
    const hasRole = requiredRoles?.some((role) => userRoles.includes(role));

    if (requiredRoles && !hasRole) {
      this.router.navigate(['/403']);
      return false;
    }


    return true;
  }

}
