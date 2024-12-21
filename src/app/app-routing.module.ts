import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { DesignationComponent } from './designation/designation.component';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'employee',
    children: [
      { path: 'all', component: EmployeeComponent },
      { path: 'add', component: AddNewEmployeeComponent },
      { path: 'registered', component: EmployeeComponent },
      { path: 'past', component: EmployeeComponent },
    ],
  },
  {
    path: 'department',
    children: [
      { path: 'all', component: DepartmentComponent },
      { path: 'add', component: DepartmentComponent },
      { path: 'edit', component: DepartmentComponent },
    ],
  },
  {
    path: 'designation',
    children: [
      { path: 'all', component: DesignationComponent },
      { path: 'add', component: DesignationComponent },
      { path: 'edit', component: DesignationComponent },
    ],
  },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
