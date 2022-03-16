import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveP2Component } from './active-p2.component';

describe('ActiveP2Component', () => {
  let component: ActiveP2Component;
  let fixture: ComponentFixture<ActiveP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveP2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
