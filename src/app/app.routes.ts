import { Routes } from '@angular/router';
import { CrearAutorComponent } from './components/autor/crear-autor/crear-autor.component';
import { CrearCategoriaComponent } from './components/categoria/crear-categoria/crear-categoria.component';

export const routes: Routes =  [
  { path: 'autor', component: CrearAutorComponent },
  { path: 'categoria', component: CrearCategoriaComponent },
];
