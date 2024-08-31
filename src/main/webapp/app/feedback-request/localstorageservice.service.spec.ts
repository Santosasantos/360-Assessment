import { TestBed } from '@angular/core/testing';

import { LocalstorageserviceService } from './localstorageservice.service';

describe('LocalstorageserviceService', () => {
  let service: LocalstorageserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
