import { Injectable } from '@angular/core';
import { Encuesta } from '../_model/Encuesta';
import { HttpClient } from '@angular/common/http';
import { HOST_BACKEND, TOKEN_NAME } from '../_shared/constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {

  urlEncuesta: string = `${HOST_BACKEND}/api/encuesta`;

  mensajeRegistro = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  obtenerCatalogoEncuestas() {
    return this.httpClient.get<Encuesta[]>(`${this.urlEncuesta}/encuestas/listar`);
  }

  obtenerEncuestasPropias(page: number, size: number) {
    return this.httpClient.get<Encuesta[]>(`${this.urlEncuesta}/listar?page=${page}&size=${size}`);
  }

  guardarEncuesta(encuesta: Encuesta) {
    return this.httpClient.post(`${this.urlEncuesta}/registrar`, encuesta);
  }

  eliminarEncuesta(id: number) {
    return this.httpClient.delete(`${this.urlEncuesta}/eliminar/${id}`);
  }
}
