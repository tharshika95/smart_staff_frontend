import { Component } from '@angular/core';
import { SmartStaffService } from '../smart-staff.service';
import { Department, Designation } from '../model/smart_staff_models';

@Component({
  selector: 'app-add-new-employee',
  standalone: false,
  
  templateUrl: './add-new-employee.component.html',
  styleUrl: './add-new-employee.component.css'
})
export class AddNewEmployeeComponent {
  departments: Department[] = [];
  designations: Designation[] = [];

  constructor(private service: SmartStaffService) {  }
  
  ngOnInit(): void {
    
    this.getDepartments();
    this.getDesignations();

    console.log(this.departments);
    console.log(this.designations);
  }

 
  getDepartments(): void {
    this.service.getDepartments().subscribe((response) => {
      if (response.status === 'SUCCESS' && response.data) {
        this.departments = response.data;
        console.log('Departments:', this.departments); // Log after fetching data
      }
    });
  }

  getDesignations(): void {
    this.service.getDesignations().subscribe((response) => {
      if (response.status === 'SUCCESS' && response.data) {
        this.designations = response.data;
        console.log('Designations:', this.designations); // Log after fetching data
      }
    });
  }


}
