import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPrestamoComponent } from './eliminar-prestamo.component';

describe('EliminarPrestamoComponent', () => {
  let component: EliminarPrestamoComponent;
  let fixture: ComponentFixture<EliminarPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarPrestamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
