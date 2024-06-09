import { Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { SeccionReservasComponent } from './seccion-reservas/seccion-reservas.component';
import { AdministracionComponent } from './administracion/administracion.component';

export const routes: Routes = [
    {path: '', redirectTo: 'pagina-principal', pathMatch: 'full'},
    {path: 'pagina-principal', component: PaginaPrincipalComponent, children: [
        
    ]},
    {path: 'reservas', component: SeccionReservasComponent},
    {path: 'administracion', component: AdministracionComponent}
];
