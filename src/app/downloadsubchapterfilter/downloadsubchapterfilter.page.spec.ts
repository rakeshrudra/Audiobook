import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsubchapterfilterPage } from './downloadsubchapterfilter.page';

describe('DownloadsubchapterfilterPage', () => {
  let component: DownloadsubchapterfilterPage;
  let fixture: ComponentFixture<DownloadsubchapterfilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadsubchapterfilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsubchapterfilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
