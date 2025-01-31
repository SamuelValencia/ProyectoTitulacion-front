import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {

}
