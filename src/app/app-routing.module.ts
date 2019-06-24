import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { SecurityComponent } from './pages/security/security.component';
import { GuardService } from './_services/guard.service';
import { LogoutComponent } from './pages/logout/logout.component';
import { CursoComponent } from './pages/admin/curso/cursos.component';
import { PersonaComponent } from './pages/admin/persona/personas.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { BodyComponent } from './pages/body/body.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuardService]},
  {path: 'logout', component: LogoutComponent},
  {path: 'security', component: SecurityComponent},
  {path: 'app', component: BodyComponent, children: [
  {path: 'about', component: AboutComponent},
  {path: 'encuesta', component: EncuestaComponent},
  {path: 'admin', component: AdminComponent, children: [
  {path: 'curso', component: CursoComponent},
  {path: 'persona', component: PersonaComponent}
   ]},
  ], canActivate: [GuardService]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
