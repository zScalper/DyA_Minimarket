import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespachoComponent } from './despacho.component';

describe('DespachoComponent', () => {
  let component: DespachoComponent;
  let fixture: ComponentFixture<DespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DespachoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
