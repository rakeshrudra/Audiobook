import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainsearchPage } from './mainsearch.page';

describe('MainsearchPage', () => {
  let component: MainsearchPage;
  let fixture: ComponentFixture<MainsearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainsearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainsearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
