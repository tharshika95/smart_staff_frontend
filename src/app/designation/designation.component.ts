import { Component, ViewChild } from '@angular/core';
import { Designation } from '../model/smart_staff_models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SmartStaffService } from '../smart-staff.service';

@Component({
  selector: 'app-designation',
  standalone: false,
  
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent {

  displayedColumns: string[] = ['id', 'name', 'description', 'active', 'actions'];
  dataSource!: MatTableDataSource<Designation>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: SmartStaffService) {
    this.dataSource = new MatTableDataSource(); // Initialize the data source
  }

  ngOnInit(): void {
    this.fetchDesignations();
  }

  fetchDesignations() {
    this.service.getDesignations().subscribe((response) => {
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

  editDesignation(id: number) {
    console.log('Edit Designation:', id);
    // Add edit functionality here
  }

  deleteDesignation(id: number) {
    if (confirm('Are you sure you want to delete this designation?')) {
      this.service.deleteDesignationDetail(id).subscribe(() => this.fetchDesignations());
    }
  }
  
}
