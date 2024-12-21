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
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';

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
    AddNewEmployeeComponent
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

  ],
  providers: [
    provideAnimationsAsync()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
