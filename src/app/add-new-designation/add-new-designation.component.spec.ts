import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDesignationComponent } from './add-new-designation.component';

describe('AddNewDesignationComponent', () => {
  let component: AddNewDesignationComponent;
  let fixture: ComponentFixture<AddNewDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewDesignationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
