import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaLekarComponent } from './registracija-lekar.component';

describe('RegistracijaLekarComponent', () => {
  let component: RegistracijaLekarComponent;
  let fixture: ComponentFixture<RegistracijaLekarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistracijaLekarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistracijaLekarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
