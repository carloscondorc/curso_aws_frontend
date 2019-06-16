import { Component, OnInit, Input } from '@angular/core';
import { EncuestaService } from '../../../_services/encuesta.service';
import { CursoService} from '../../../_services/curso.service';
import { Encuesta } from '../../../_model/Encuesta';
import { Curso } from '../../../_model/Curso'


@Component({
  selector: 'app-nuevaencuesta',
  templateUrl: './nuevaencuesta.component.html',
  styleUrls: ['./nuevaencuesta.component.css']
})
export class NuevaEncuestaComponent implements OnInit {

  encuestas: Encuesta[] = [];
  cursos: Curso[] = [];
  texto: string = '';
  encuesta: Encuesta;

  constructor(
    private serviceEncuesta: EncuestaService, private serviceCurso: CursoService) {
    this.encuesta = new Encuesta();
  }

  ngOnInit() {
    this.serviceEncuesta.obtenerCatalogoEncuestas().subscribe((data) => {
      this.encuestas = data;
    });

    this.serviceCurso.obtenerCatalogoCursos().subscribe((data) => {
      this.cursos = data;
    });
  }

  onSubmit() {
    //this.encuesta.fecha = new Date();
    this.serviceEncuesta.guardarEncuesta(this.encuesta).subscribe((data)=>{
        this.serviceEncuesta.mensajeRegistro.next('Registrado Correctamente...');
    }, (error) => {
      this.serviceEncuesta.mensajeRegistro.next('Error al guardar el feedback...');
    });
  }

}
