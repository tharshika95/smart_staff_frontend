import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { DesignationComponent } from './designation/designation.component';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { UserComponent } from './user/user.component';
import { AddNewDepartmentComponent } from './add-new-department/add-new-department.component';
import { AddNewDesignationComponent } from './add-new-designation/add-new-designation.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'employee',
    children: [
      { path: 'all', component: EmployeeComponent },
      { path: 'add', component: AddNewEmployeeComponent },
      { path: 'edit/:id', component: AddNewEmployeeComponent }, 
      { path: 'view/:id', component: EmployeeViewComponent }, 
      { path: 'registered', component: EmployeeComponent },
      { path: 'past', component: EmployeeComponent },
    ],
  },
  {
    path: 'department',
    children: [
      { path: 'all', component: DepartmentComponent },
      { path: 'add', component: AddNewDepartmentComponent },
      { path: 'edit/:id', component: AddNewDepartmentComponent },
    ],
  },
  {
    path: 'designation',
    children: [
      { path: 'all', component: DesignationComponent },
      { path: 'add', component: AddNewDesignationComponent },
      { path: 'edit/:id', component: AddNewDesignationComponent },
    ],
  },
  {
    path: 'users',
    children: [
      { path: 'all', component: UserComponent },
      { path: 'edit/:id', component: UserComponent },
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
