import { TestBed } from '@angular/core/testing';

import { TrandingaudioService } from './trandingaudio.service';

describe('TrandingaudioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: TrandingaudioService = TestBed.get(TrandingaudioService);
    expect(service).toBeTruthy();
  });
});
