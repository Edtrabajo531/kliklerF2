import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatosUsuarioComponent } from './form-datos-usuario.component';

describe('FormDatosUsuarioComponent', () => {
  let component: FormDatosUsuarioComponent;
  let fixture: ComponentFixture<FormDatosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDatosUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDatosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
