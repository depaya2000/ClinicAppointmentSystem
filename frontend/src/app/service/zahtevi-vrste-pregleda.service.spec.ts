import { TestBed } from '@angular/core/testing';

import { ZahteviVrstePregledaService } from './zahtevi-vrste-pregleda.service';

describe('ZahteviVrstePregledaService', () => {
  let service: ZahteviVrstePregledaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZahteviVrstePregledaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
