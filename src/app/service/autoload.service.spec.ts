import { TestBed } from '@angular/core/testing';

import { AutoloadService } from './autoload.service';

describe('AutoloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoloadService = TestBed.get(AutoloadService);
    expect(service).toBeTruthy();
  });
});
