import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAutorComponent } from './eliminar-autor.component';

describe('EliminarAutorComponent', () => {
  let component: EliminarAutorComponent;
  let fixture: ComponentFixture<EliminarAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarAutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
