import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilPasswordComponent } from './editar-perfil-password.component';

describe('EditarPerfilPasswordComponent', () => {
  let component: EditarPerfilPasswordComponent;
  let fixture: ComponentFixture<EditarPerfilPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPerfilPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPerfilPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
