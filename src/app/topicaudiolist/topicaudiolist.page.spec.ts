import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicaudiolistPage } from './topicaudiolist.page';

describe('TopicaudiolistPage', () => {
  let component: TopicaudiolistPage;
  let fixture: ComponentFixture<TopicaudiolistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicaudiolistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicaudiolistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
