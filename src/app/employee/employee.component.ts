import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { basePath, SmartStaffService } from '../smart-staff.service';
import { Employee } from '../model/smart_staff_models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employee',
  standalone: false,
  
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements AfterViewInit{
  employees: Employee[] = [];
  totalEmployees: number = 0;
  currentPage: number = 0; // Current page index (starts from 0)
  pageSize: number = 5;   // Number of items per page
  basePath: string = basePath + "/api/employees";


  displayedColumns: string[] = ['empId', 'name', 'email', 'status', 'actions'];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private service: SmartStaffService) {  }

  ngAfterViewInit() {
    // Ensure paginator and sort are linked after view initialization
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

     // Listen to paginator's page event
     this.paginator.page.subscribe(() => {
      this.currentPage = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
      this.fetchEmployees(); // Fetch data for the updated page
    });

  }

  ngOnInit(): void {
    // Fetch employees without search query by default
    this.fetchEmployees();
  }

  /**
   * Fetch employees based on pagination and optional search query.
   */
  fetchEmployees(): void {
    // Call getEmployees method with search query if provided
    this.service.getEmployees(this.currentPage, this.pageSize).subscribe((response) => {
      if (response.status === 'SUCCESS' && response.data) {
        this.employees = response.data.content;
        this.totalEmployees = response.data.totalElements;

        // Initialize the data source and set paginator and sort
        this.dataSource = new MatTableDataSource(this.employees);

        // Update paginator state
      if (this.paginator) {
        this.paginator.length = response.data.totalElements; // Total number of elements
        this.paginator.pageIndex = response.data.number;     // Current page index
        this.paginator.pageSize = response.data.size;        // Current page size
      }

       // Set paginator and sort for the data table
       if (this.sort) {
        this.dataSource.sort = this.sort;
      }

        
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

  onView(row: Employee): void {
    console.log('View clicked', row);
    // Navigate to the view page or open a dialog to show details
  }
  
  onEdit(row: Employee): void {
    console.log('Edit clicked', row);
    // Navigate to the edit page or open a dialog for editing
  }
  
  onDelete(row: Employee): void {
    console.log('Delete clicked', row);
    // Call a service to delete the employee or open a confirmation dialog
  }

}
