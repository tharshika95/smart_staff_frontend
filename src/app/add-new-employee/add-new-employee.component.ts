import { Component } from '@angular/core';
import { basePath, SmartStaffService } from '../smart-staff.service';
import { Department, Designation } from '../model/smart_staff_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-employee',
  standalone: false,

  templateUrl: './add-new-employee.component.html',
  styleUrl: './add-new-employee.component.css'
})
export class AddNewEmployeeComponent {

  employeeForm!: FormGroup;
  departments: Department[] = [];
  designations: Designation[] = [];
  uploadedImage: string | null = null;
  employeeId: string | null = null;
  basepath: string = basePath + "/api/employees";

  constructor(private fb: FormBuilder,
    private service: SmartStaffService,
    private toastr: ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    // Initialize the form before any logic
    this.initializeForm();

    // Check if the route has an 'id' parameter
    const employeeIdParam = this.route.snapshot.paramMap.get('id');
    if (employeeIdParam) {
      // Convert the string ID to a number
      const employeeId = Number(employeeIdParam);
      if (!isNaN(employeeId)) {
        // Load details for editing
        this.loadEmployeeDetails(employeeId);
      } else {
        console.error('Invalid employee ID');
      }
    }
    this.loadDepartments();
    this.loadDesignations();
    this.generateEmployeeId();
    console.log(this.departments);
    console.log(this.designations);
  }

  initializeForm() {
    this.employeeForm = this.fb.group({
      empId: [{ value: '', disabled: true }],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dateOfJoining: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      isActive: [true],
      temporaryAddress: [''],
      permanentAddress: [''],
      contactNo1: ['', Validators.required],
      contactNo2: [''],
      departmentId: ['', Validators.required],
      designationId: ['', Validators.required],
      imagePath: ['']
    });
  }

  generateEmployeeId() {
    this.service.generateNextEmpId().subscribe((response) => {
      if (response.status === 'SUCCESS' && response.data) {
        this.employeeId = response.data;
        console.log('Empid:', this.employeeId); // Log after fetching data
        this.employeeForm.patchValue({ empId: this.employeeId });
      }
    });
    // this.employeeForm.patchValue({ empId: 'EMP' + Math.floor(Math.random() * 1000) });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (this.employeeId) {
        this.service.uploadEmployeeImage(file, this.employeeId).subscribe((response) => {
          if (response.status === 'SUCCESS') {
            this.uploadedImage = this.basepath + response.data;
            this.employeeForm.patchValue({ imagePath: response.data });
            this.toastr.success('Image Uploaded!', 'success');
          }
        });
      } else {
        this.toastr.error('Image upload failed', 'Error');
        console.error('Employee ID is null or undefined');
      }
    }
  }

  onDeleteImage() {
    // Assuming employeeId is valid
    if (this.employeeId) {
      this.service.deleteEmployeeImage(this.employeeId).subscribe((response) => {
        if (response.status === 'SUCCESS') {

          this.toastr.success('Image deleted successfully!', 'success');

          // Clear the image preview
          this.uploadedImage = null;

          // Reset the form field
          this.employeeForm.patchValue({ imagePath: '' });

          // Clear the file input field
          const fileInput = document.getElementById('fileInput') as HTMLInputElement;
          if (fileInput) {
            fileInput.value = ''; // Reset the file input value
          }
        }
      });
    } else {
      this.toastr.error('Image deleted failed', 'Error');
      console.error('Image deleted failed');
    }
  }

  onSubmit() {
     // Check if the route has an 'id' parameter
     const employeeIdParam = this.route.snapshot.paramMap.get('id');
     if (employeeIdParam) {
       // Convert the string ID to a number
       const employeeId = Number(employeeIdParam);
       if (!isNaN(employeeId)) {
        const payload = this.employeeForm.getRawValue();
        this.service.updateEmployee(payload, employeeId).subscribe((response) => {
          if (response.status === 'SUCCESS') {
            this.toastr.success('Employee created successfully!', 'success');
            this.resetForm();
          }
        });
       } else {
         console.error('Invalid employee ID');
       }
     }else{

      if (this.employeeForm.valid) {
        const payload = this.employeeForm.getRawValue();
        this.service.createEmployee(payload).subscribe((response) => {
          if (response.status === 'SUCCESS') {
            this.toastr.success('Employee created successfully!', 'success');
            this.resetForm();
          }
        });
      }

     }
  }

  loadDepartments(): void {
    this.service.getDepartments().subscribe((response) => {
      if (response.status === 'SUCCESS' && response.data) {
        this.departments = response.data;
        console.log('Departments:', this.departments); // Log after fetching data
      }
    });
  }

  loadDesignations(): void {
    this.service.getDesignations().subscribe((response) => {
      if (response.status === 'SUCCESS' && response.data) {
        this.designations = response.data;
        console.log('Designations:', this.designations); // Log after fetching data
      }
    });
  }

  resetForm() {
    this.employeeForm.reset({
      empId: '', // Disabled field, so explicitly reset it
      name: '',
      email: '',
      dateOfJoining: '',
      salary: '',
      isActive: true, // Set default value
      temporaryAddress: '',
      permanentAddress: '',
      contactNo1: '',
      contactNo2: '',
      departmentId: '',
      designationId: '',
      imagePath: ''
    });

    // Additional UI-related resets
    this.uploadedImage = null; // Clear uploaded image preview
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();  // Open file selection dialog
    }
  }

  loadEmployeeDetails(id: number): void {
    this.service.getEmployeeDetails(id).subscribe((response) => {
      if (response.status === 'SUCCESS' && response.data) {
        const employee = response.data;

        // Patch form values
        this.employeeForm.patchValue({
          empId: employee.empId,
          name: employee.name,
          email: employee.email,
          dateOfJoining: employee.dateOfJoining,
          salary: employee.salary,
          isActive: employee.active,
          temporaryAddress: employee.temporaryAddress,
          permanentAddress: employee.permanentAddress,
          contactNo1: employee.contactNo1,
          contactNo2: employee.contactNo2,
          departmentId: employee.department.id,
          designationId: employee.designation.id,
          imagePath: employee.imagePath,
        });

        // Set uploaded image for preview
        this.uploadedImage = this.basepath + employee.imagePath;

        // Store empId for other operations
        this.employeeId = employee.empId;
      }
    });
  }


}
