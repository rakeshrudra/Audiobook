import { TestBed } from '@angular/core/testing';

import { PlaynewmediaService } from './playnewmedia.service';

describe('PlaynewmediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaynewmediaService = TestBed.get(PlaynewmediaService);
    expect(service).toBeTruthy();
  });
});
