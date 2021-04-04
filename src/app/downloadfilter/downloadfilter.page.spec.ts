import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadfilterPage } from './downloadfilter.page';

describe('DownloadfilterPage', () => {
  let component: DownloadfilterPage;
  let fixture: ComponentFixture<DownloadfilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadfilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadfilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
