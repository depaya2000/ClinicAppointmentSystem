import { TestBed } from '@angular/core/testing';

import { LekarService } from './lekar.service';

describe('LekarService', () => {
  let service: LekarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LekarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
