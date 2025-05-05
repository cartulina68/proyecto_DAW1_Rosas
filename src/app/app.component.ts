import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Autor, AutorService } from './services/Autor/autor.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  author!: Autor;
  title = 'proyecto_angular_DAW1_RosasGrandaAdriano';

  constructor(private autorService: AutorService) {}

  async ngOnInit(): Promise<void> {
    // this.author = await lastValueFrom(this.autorService.crearAutor({
    //   // id: 1,
    //   nombre: "Jhon Doe",
    //   nacionalidad: "Rusia",
    // }));

    // console.log(this.author);
  }
}
