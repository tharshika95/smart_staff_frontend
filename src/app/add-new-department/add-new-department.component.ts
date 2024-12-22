import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartStaffService } from '../smart-staff.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-department',
  standalone: false,
  
  templateUrl: './add-new-department.component.html',
  styleUrl: './add-new-department.component.css'
})
export class AddNewDepartmentComponent {

  departmentForm!: FormGroup;
  departmentId!: number;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: SmartStaffService,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      isActive: [true, Validators.required]
    });

    // Check if editing an existing department
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.departmentId = +params['id'];
        this.isEditMode = true;
        this.loadDepartmentDetail(this.departmentId);
      }
    });
  }

  loadDepartmentDetail(id: number): void {
    this.service.getDepartmentDetail(id).subscribe(response => {
      if (response.status === 'SUCCESS' && response.data) {
        this.departmentForm.patchValue(response.data);
      }
    });
  }

  onSubmit(): void {
    if (this.departmentForm.invalid) {
      return;
    }

    const payload = this.departmentForm.value;

    if (this.isEditMode) {
      // Update department
      this.service.updateDepartmentDetail(payload, this.departmentId).subscribe(response => {
        this.toastr.success('Department updated successfully!', 'success');
        this.router.navigate(['/department/all']); // Navigate to the departments list
      });
    } else {
      // Create new department
      this.service.createDepartmentDetail(payload).subscribe(response => {
        this.toastr.success('Department created successfully!', 'success');
        this.router.navigate(['/department/all']); // Navigate to the departments list
      });
    }
  }
}
