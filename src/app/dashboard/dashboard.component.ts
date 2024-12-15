import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  stats = [
    { count: 2, label: 'Total Departments', icon: 'apartment' },
    { count: 2, label: 'Total Designations', icon: 'work' },
    { count: 2, label: 'Total Users', icon: 'person' },
    { count: 2, label: 'Total Employees', icon: 'people' },
    { count: 2, label: 'Total Evaluators', icon: 'visibility' },
    { count: 3, label: 'Total Tasks', icon: 'task' }
  ];
  
}
