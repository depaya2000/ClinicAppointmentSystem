import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SviLekariComponent } from './svi-lekari.component';

describe('SviLekariComponent', () => {
  let component: SviLekariComponent;
  let fixture: ComponentFixture<SviLekariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SviLekariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SviLekariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
