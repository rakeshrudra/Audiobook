import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstlunchPage } from './firstlunch.page';

describe('FirstlunchPage', () => {
  let component: FirstlunchPage;
  let fixture: ComponentFixture<FirstlunchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstlunchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstlunchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
