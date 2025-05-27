import { TestBed } from '@angular/core/testing';

import { MenadzerService } from './menadzer.service';

describe('MenadzerService', () => {
  let service: MenadzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenadzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
