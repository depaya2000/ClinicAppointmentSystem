import { TestBed } from '@angular/core/testing';

import { PacijentService } from './pacijent.service';

describe('PacijentService', () => {
  let service: PacijentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacijentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
