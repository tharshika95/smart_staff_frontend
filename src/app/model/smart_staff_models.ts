  export interface ApiResponse<T> {
    currentPage: number;
    totalPages: number;
    status: Status;
    data: T | null;
    error: ErrorDetails | null;
  }
  
  export enum Status {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    PARTIAL_SUCCESS = "PARTIAL_SUCCESS",
    EXCEPTION = "EXCEPTION"
  }
  
  export interface ErrorDetails {
    code: string;
    message: string;
    fieldErrors?: FieldError[];
  }
  
  export interface FieldError {
    field: string;
    message: string;
  }
  
  export interface EmployeeResponse {
    content: Employee[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    empty: boolean;
  }
  
  export interface Employee {
    id: number;
    empId: string;
    name: string;
    email: string;
    dateOfJoining: string;
    salary: number;
    temporaryAddress: string;
    permanentAddress: string;
    imagePath: string;
    contactNo1: string;
    contactNo2: string;
    department: Department;
    designation: Designation;
    isActive: boolean;
  }
  
  export interface Department {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
  }
  
  export interface Designation {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
  }
  
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  }
  
  export interface Sort {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  }
  