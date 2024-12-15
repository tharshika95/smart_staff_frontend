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
import { LeaveComponent } from './leave/leave.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  exports: [
    
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeComponent,
    DepartmentComponent,
    LeaveComponent,
    LogoutComponent
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
    MatMenuModule
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
