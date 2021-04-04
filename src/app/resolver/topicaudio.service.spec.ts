import { TestBed } from '@angular/core/testing';

import { TopicaudioService } from './topicaudio.service';

describe('TopicaudioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopicaudioService = TestBed.get(TopicaudioService);
    expect(service).toBeTruthy();
  });
});
