import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: false,
  
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private router: Router) {}

  logout() {
    // Perform logout logic here
    console.log('Logged out');
    this.router.navigate(['/']); // Redirect to home or login
  }
  
}
