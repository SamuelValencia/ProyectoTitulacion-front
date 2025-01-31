import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AprobadosComponent } from './components/aprobados/aprobados.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { PropuestasComponent } from './components/propuestas/propuestas.component';
import { RevisionComponent } from './components/revision/revision.component';

export const routes: Routes =  [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'aprobados', component: AprobadosComponent},
    { path: 'alumnos', component: AlumnosComponent},
    { path: 'home', component: HomeComponent },
    { path: 'docentes', component: DocentesComponent },
    { path: 'propuestas', component: PropuestasComponent},
    { path: 'revision', component: RevisionComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
  ];

  