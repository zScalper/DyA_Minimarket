import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDespachoComponent } from './nuevo-despacho.component';

describe('NuevoDespachoComponent', () => {
  let component: NuevoDespachoComponent;
  let fixture: ComponentFixture<NuevoDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoDespachoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
