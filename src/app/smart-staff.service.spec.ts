import { TestBed } from '@angular/core/testing';

import { SmartStaffService } from './smart-staff.service';

describe('SmartStaffService', () => {
  let service: SmartStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
