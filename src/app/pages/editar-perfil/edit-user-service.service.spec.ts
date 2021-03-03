import { TestBed } from '@angular/core/testing';

import { EditUserServiceService } from './edit-user-service.service';

describe('EditUserServiceService', () => {
  let service: EditUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
