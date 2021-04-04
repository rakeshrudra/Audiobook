import { TestBed } from '@angular/core/testing';

import { AllbooksService } from './allbooks.service';

describe('AllbooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllbooksService = TestBed.get(AllbooksService);
    expect(service).toBeTruthy();
  });
});
