import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreglediPacijentaComponent } from './pregledi-pacijenta.component';

describe('PreglediPacijentaComponent', () => {
  let component: PreglediPacijentaComponent;
  let fixture: ComponentFixture<PreglediPacijentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreglediPacijentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreglediPacijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
