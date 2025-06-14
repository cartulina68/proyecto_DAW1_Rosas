import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAutoresComponent } from './listar-autores.component';

describe('ListarAutoresComponent', () => {
  let component: ListarAutoresComponent;
  let fixture: ComponentFixture<ListarAutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAutoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
