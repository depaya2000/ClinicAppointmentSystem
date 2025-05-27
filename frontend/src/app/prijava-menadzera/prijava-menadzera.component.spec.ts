import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavaMenadzeraComponent } from './prijava-menadzera.component';

describe('PrijavaMenadzeraComponent', () => {
  let component: PrijavaMenadzeraComponent;
  let fixture: ComponentFixture<PrijavaMenadzeraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrijavaMenadzeraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrijavaMenadzeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
