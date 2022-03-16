import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveP3Component } from './active-p3.component';

describe('ActiveP3Component', () => {
  let component: ActiveP3Component;
  let fixture: ComponentFixture<ActiveP3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveP3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveP3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
