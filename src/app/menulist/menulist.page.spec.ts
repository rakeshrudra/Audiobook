import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenulistPage } from './menulist.page';

describe('MenulistPage', () => {
  let component: MenulistPage;
  let fixture: ComponentFixture<MenulistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenulistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenulistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
