import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  get historial() {
    return this.gifService.historial;
  }

  constructor( private gifService: GifsService   ) { }

  buscar( termino: string) {
    this.gifService.buscargifs(termino);

  }

}
