import { TestBed } from '@angular/core/testing';

import { ZahtevRegistracijeService } from './zahtev-registracije.service';

describe('ZahtevRegistracijeService', () => {
  let service: ZahtevRegistracijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZahtevRegistracijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
