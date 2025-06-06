import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoProductoComponent } from './ingreso-producto.component';

describe('IngresoProductoComponent', () => {
  let component: IngresoProductoComponent;
  let fixture: ComponentFixture<IngresoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
