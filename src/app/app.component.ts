import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smart_staff_frontend';

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isExpanded = true;
  showSubmenu: boolean = false;
  showEmployeeSubmenu: boolean = false;
  showSubDepartmentMenu: boolean = false;
  showSubDesignationMenu: boolean = false;
  showUserManagernMenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  constructor(private router: Router, private service: AuthService) {}

  logout() {
    // Perform logout logic here
    console.log('Logged out');
    this.service.logout()
  }

  shouldShowLayout(): boolean {
    const excludedRoutes = ['/login', '/403', '/404']; // Add more routes if needed
    return !excludedRoutes.includes(this.router.url);
  }
}
