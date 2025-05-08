import { Routes } from '@angular/router';

// AUTOR
import { ListarAutoresComponent } from './components/autor/listar-autores/listar-autores.component';
import { CrearAutorComponent } from './components/autor/crear-autor/crear-autor.component';
// import { ActualizarAutorComponent } from './components/autor/actualizar-autor/actualizar-autor.component';
// import { EliminarAutorComponent } from './components/autor/eliminar-autor/eliminar-autor.component';

// CATEGORIA
import { ListarCategoriasComponent } from './components/categoria/listar-categorias/listar-categorias.component';
import { CrearCategoriaComponent } from './components/categoria/crear-categoria/crear-categoria.component';

// LIBRO
import { ListarLibrosComponent } from './components/libro/listar-libros/listar-libros.component';
import { CrearLibroComponent } from './components/libro/crear-libro/crear-libro.component';

// USUARIO
import { ListarUsuariosComponent } from './components/usuario/listar-usuarios/listar-usuarios.component';

// PRESTAMOS
import { ListarPrestamosComponent } from './components/prestamo/listar-prestamos/listar-prestamos.component';

export const routes: Routes =  [

  // AUTOR
  { path: 'autores', component: ListarAutoresComponent },
  // { path: 'crear-autor', component: CrearAutorComponent },
  // { path: 'actualizar-autor', component: ActualizarAutorComponent },
  // { path: 'eliminar-autor', component: EliminarAutorComponent },

  // CATEGORIA
  { path: 'categorias', component: ListarCategoriasComponent },
  { path: 'crear-categoria', component: CrearCategoriaComponent },

  // LIBRO
  { path: 'libros', component: ListarLibrosComponent},
  { path: 'crear-libro', component: CrearLibroComponent},

  // USUARIO
  { path: 'usuarios', component: ListarUsuariosComponent},

  // PRESTAMOS
  { path: 'prestamos', component: ListarPrestamosComponent}
];
