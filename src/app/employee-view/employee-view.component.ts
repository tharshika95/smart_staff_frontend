import { Component } from '@angular/core';
import { Employee } from '../model/smart_staff_models';
import { ActivatedRoute } from '@angular/router';
import { basePath, SmartStaffService } from '../smart-staff.service';

@Component({
  selector: 'app-employee-view',
  standalone: false,
  
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.css'
})
export class EmployeeViewComponent {

  employee: Employee | undefined;
  basePath: string = basePath + "/api/employees";


  constructor(
    private route: ActivatedRoute,
    private service: SmartStaffService
  ) {}

  ngOnInit(): void {
    const employeeIdParam = this.route.snapshot.paramMap.get('id');
    if (employeeIdParam) {
      const employeeId = Number(employeeIdParam);
      if (!isNaN(employeeId)) {
        this.loadEmployeeDetails(employeeId);
      } else {
        console.error('Invalid employee ID');
      }
    }
  }

  loadEmployeeDetails(id: number): void {
    this.service.getEmployeeDetails(id).subscribe((response) => {
      if (response.status === 'SUCCESS' && response.data) {
        this.employee = response.data;
      }
    });
  }

}
