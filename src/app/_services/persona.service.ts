import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST_BACKEND, TOKEN_NAME } from '../_shared/constants';
import { Subject } from 'rxjs';
import { Persona } from "../_model/Persona";

@Injectable({
  providedIn: 'root',
})
export class PersonaService {

  urlPersona: string = `${HOST_BACKEND}/api/persona`;

  mensajeRegistro = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  obtenerCatalogoPersonas() {
    return this.httpClient.get<Persona[]>(`${this.urlPersona}/persona/listar`);
  }

  guardarPersona(persona: Persona) {
    return this.httpClient.post(`${this.urlPersona}/registrar`, persona);
  }

  eliminarPersona(id: number) {
    return this.httpClient.delete(`${this.urlPersona}/eliminar/${id}`);
  }

  obtenerRegistros(page: number, size: number) {
    return this.httpClient.get<Persona[]>(`${this.urlPersona}/listarpaginado?page=${page}&size=${size}`);
  }
}
