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
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee/all', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'employee',
    children: [
      { path: 'all', component: EmployeeComponent, canActivate: [AuthGuard] },
      { path: 'add', component: AddNewEmployeeComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: AddNewEmployeeComponent, canActivate: [AuthGuard] }, 
      { path: 'view/:id', component: EmployeeViewComponent, canActivate: [AuthGuard] }, 
      { path: 'registered', component: EmployeeComponent, canActivate: [AuthGuard] },
      { path: 'past', component: EmployeeComponent, canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'department',
    children: [
      { path: 'all', component: DepartmentComponent, canActivate: [AuthGuard] },
      { path: 'add', component: AddNewDepartmentComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: AddNewDepartmentComponent,canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'designation',
    children: [
      { path: 'all', component: DesignationComponent, canActivate: [AuthGuard] },
      { path: 'add', component: AddNewDesignationComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: AddNewDesignationComponent, canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'users',
    children: [
      { path: 'all', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: UserComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '403', component: ForbiddenComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
