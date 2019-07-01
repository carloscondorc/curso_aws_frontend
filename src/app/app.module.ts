import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { NuevaEncuestaComponent } from './pages/encuesta/nueva/nuevaencuesta.component';
import { SecurityComponent } from './pages/security/security.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { CursoComponent } from './pages/admin/curso/cursos.component';
import { PersonaComponent } from './pages/admin/persona/personas.component';
import { NuevoCursoComponent } from './pages/admin/curso/nuevocurso/nuevocurso.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BodyComponent } from './pages/body/body.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/login/error/error.component';
import { NuevaPersonaComponent } from './pages/admin/persona/nuevapersona/nuevapersona.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    EncuestaComponent,
    NuevaEncuestaComponent,
    SecurityComponent,
    LogoutComponent,
    CursoComponent,
    NuevoCursoComponent,
    PersonaComponent,
    NuevaPersonaComponent,
    AdminComponent,
    BodyComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    //API KEY de google maps configurado en google cloud platform
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyDRlxhDKnHX5ie8Y3gJe1YOYpC4dWpa0no'
      apiKey: 'AIzaSyB1fcdGLyWTqJjEdWkpGyVD5n0axggKhu0'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
  entryComponents: [
    NuevaEncuestaComponent, 
    NuevoCursoComponent,
    NuevaPersonaComponent,
    ErrorComponent]
})
export class AppModule { }
