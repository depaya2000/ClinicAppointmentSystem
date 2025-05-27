import { TestBed } from '@angular/core/testing';

import { VrstePregledaService } from './vrste-pregleda.service';

describe('VrstePregledaService', () => {
  let service: VrstePregledaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VrstePregledaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
