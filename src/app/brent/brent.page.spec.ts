import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrentPage } from './brent.page';

describe('BrentPage', () => {
  let component: BrentPage;
  let fixture: ComponentFixture<BrentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
