import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { LogoutComponent } from './logout/logout.component';
import { AppRoutingModule } from './app-routing.module';
import { DesignationComponent } from './designation/designation.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr, ToastrModule } from 'ngx-toastr';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { UserComponent } from './user/user.component';
import { AddNewDepartmentComponent } from './add-new-department/add-new-department.component';
import { AddNewDesignationComponent } from './add-new-designation/add-new-designation.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  exports: [
    
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeComponent,
    DepartmentComponent,
    LogoutComponent,
    DesignationComponent,
    AddNewEmployeeComponent,
    EmployeeViewComponent,
    UserComponent,
    AddNewDepartmentComponent,
    AddNewDesignationComponent,
    LoginComponent,
    ForbiddenComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ɵInternalFormsSharedModule,
    MatFormFieldModule,
    MatInputModule, 
    MatTableModule,
    MatSortModule, 
    MatPaginatorModule,
    MatChipsModule,
    MatSort,
    MatPaginator,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(
      {
        timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    )
  ],
  providers: [
    provideAnimationsAsync(),
   
    provideToastr(), // Toastr providers
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
