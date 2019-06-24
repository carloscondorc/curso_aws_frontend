import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST_BACKEND, TOKEN_NAME } from '../_shared/constants';
import { Subject } from 'rxjs';
import { Curso } from "../_model/Curso";

@Injectable({
  providedIn: 'root',
})
export class CursoService {

  urlCurso: string = `${HOST_BACKEND}/api/curso`;

  mensajeRegistro = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  obtenerCatalogoCursos() {
    return this.httpClient.get<Curso[]>(`${this.urlCurso}/listar`);
  }

  guardarCurso(curso: Curso) {
    return this.httpClient.post(`${this.urlCurso}/registrar`, curso);
  }

  eliminarCurso(id: number) {
    return this.httpClient.delete(`${this.urlCurso}/eliminar/${id}`);
  }

  obtenerRegistros(page: number, size: number) {
    return this.httpClient.get<Curso[]>(`${this.urlCurso}/listarpaginado?page=${page}&size=${size}`);
  }
}
