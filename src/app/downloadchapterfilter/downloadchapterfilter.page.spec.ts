import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadchapterfilterPage } from './downloadchapterfilter.page';

describe('DownloadchapterfilterPage', () => {
  let component: DownloadchapterfilterPage;
  let fixture: ComponentFixture<DownloadchapterfilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadchapterfilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadchapterfilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
