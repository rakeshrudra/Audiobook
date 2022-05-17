import { TestBed } from '@angular/core/testing';

import { SetlocalnotificationService } from './setlocalnotification.service';

describe('SetlocalnotificationService', () => {
  let service: SetlocalnotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetlocalnotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
