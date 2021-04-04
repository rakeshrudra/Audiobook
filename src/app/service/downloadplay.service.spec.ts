import { TestBed } from '@angular/core/testing';

import { DownloadplayService } from './downloadplay.service';

describe('DownloadplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadplayService = TestBed.get(DownloadplayService);
    expect(service).toBeTruthy();
  });
});
