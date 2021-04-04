import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiotopPage } from './audiotop.page';

describe('AudiotopPage', () => {
  let component: AudiotopPage;
  let fixture: ComponentFixture<AudiotopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiotopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiotopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
