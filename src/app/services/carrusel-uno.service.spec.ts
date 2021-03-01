import { TestBed } from '@angular/core/testing';

import { CarruselUnoService } from './carrusel-uno.service';

describe('CarruselUnoService', () => {
  let service: CarruselUnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarruselUnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
