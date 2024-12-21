import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Department, Designation, EmployeeResponse } from './model/smart_staff_models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmartStaffService {

  private apiUrl = basePath; // Update the host URL as required
  baseUrl: any;

  constructor(private http: HttpClient) { }

  /**
   * Fetch employee details with pagination
   * @param page The page number to fetch
   * @param size The number of employees per page
   * @returns Observable of ApiResponse<EmployeeResponse>
   */
  getEmployees(page: number, size: number): Observable<ApiResponse<EmployeeResponse>> {
    return this.http.get<ApiResponse<EmployeeResponse>>(`${this.apiUrl}/api/employees?page=${page}&size=${size}`);
  }

  /**
   * Fetch all departments.
   * @returns Observable<ApiResponse<Department[]>>
   */
  getDepartments(): Observable<ApiResponse<Department[]>> {
    return this.http.get<ApiResponse<Department[]>>(`${this.apiUrl}/api/departments`);
  }

  /**
 * Fetch all designations.
 * @returns Observable<ApiResponse<Designation[]>>
 */
  getDesignations(): Observable<ApiResponse<Designation[]>> {
    return this.http.get<ApiResponse<Designation[]>>(`${this.apiUrl}/api/designations`);
  }


}

export const basePath = "http://localhost:8080";