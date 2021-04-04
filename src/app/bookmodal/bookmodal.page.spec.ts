import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmodalPage } from './bookmodal.page';

describe('BookmodalPage', () => {
  let component: BookmodalPage;
  let fixture: ComponentFixture<BookmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
