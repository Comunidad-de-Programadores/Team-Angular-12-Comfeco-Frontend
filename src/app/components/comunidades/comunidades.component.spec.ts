import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadesComponent } from './comunidades.component';

describe('ComunidadesComponent', () => {
  let component: ComunidadesComponent;
  let fixture: ComponentFixture<ComunidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComunidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
