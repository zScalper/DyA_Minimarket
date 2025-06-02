import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProveedorComponent } from './tipo-proveedor.component';

describe('TipoProveedorComponent', () => {
  let component: TipoProveedorComponent;
  let fixture: ComponentFixture<TipoProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoProveedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
