import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SmartStaffService } from '../smart-staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-designation',
  standalone: false,
  
  templateUrl: './add-new-designation.component.html',
  styleUrl: './add-new-designation.component.css'
})
export class AddNewDesignationComponent {

  designationForm!: FormGroup;
  designationId!: number;
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
    this.designationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      isActive: [true, Validators.required]
    });

    // Check if editing an existing department
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.designationId = +params['id'];
        this.isEditMode = true;
        this.loadDepartmentDetail(this.designationId);
      }
    });
  }

  loadDepartmentDetail(id: number): void {
    this.service.getDepartmentDetail(id).subscribe(response => {
      if (response.status === 'SUCCESS' && response.data) {
        this.designationForm.patchValue(response.data);
      }
    });
  }

  onSubmit(): void {
    if (this.designationForm.invalid) {
      return;
    }

    const payload = this.designationForm.value;

    if (this.isEditMode) {
      // Update department
      this.service.updateDesignationDetail(payload, this.designationId).subscribe(response => {
        this.toastr.success('Desination updated successfully!', 'success');
        this.router.navigate(['/designation/all']); // Navigate to the departments list
      });
    } else {
      // Create new department
      this.service.createDesignationDetail(payload).subscribe(response => {
        this.toastr.success('Desination created successfully!', 'success');
        this.router.navigate(['/designation/all']); // Navigate to the departments list
      });
    }
  }
}
