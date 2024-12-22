import { Component, ViewChild } from '@angular/core';
import { Department } from '../model/smart_staff_models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SmartStaffService } from '../smart-staff.service';

@Component({
  selector: 'app-department',
  standalone: false,

  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {

  displayedColumns: string[] = ['id', 'name', 'description', 'active', 'actions'];
  dataSource!: MatTableDataSource<Department>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: SmartStaffService) {
    this.dataSource = new MatTableDataSource(); // Initialize the data source
  }

  ngOnInit(): void {
    this.fetchDepartments();
  }

  fetchDepartments() {
    this.service.getDepartments().subscribe((response) => {
      if (response.status === 'SUCCESS' && response.data) {
        // Assign response data to the table's data source
        this.dataSource.data = response.data;

        // Set up paginator and sort
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editDepartment(id: number) {
    console.log('Edit Department:', id);
    
  }

  deleteDepartment(id: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.service.deleteDepartmentDetail(id).subscribe(() => this.fetchDepartments());
    }
  }

}
