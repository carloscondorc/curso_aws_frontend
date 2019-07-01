import { Component, OnInit, Input, Inject } from '@angular/core';
import { EncuestaService } from '../../../_services/encuesta.service';
import { CursoService }  from '../../../_services/curso.service';
import { Encuesta } from '../../../_model/Encuesta';
import { Curso } from 'src/app/_model/Curso';


@Component({
  selector: 'app-nuevaencuesta',
  templateUrl: './nuevaencuesta.component.html',
  styleUrls: ['./nuevaencuesta.component.css']
})
export class NuevaEncuestaComponent implements OnInit  {

  encuesta: Encuesta;
  cursos: Curso[] = [];
 // curso: Curso;
  texto: string = '';

  
  constructor(
    private serviceEncuesta: EncuestaService,
    private serviceCurso: CursoService)

     {
    this.encuesta = new Encuesta();
   // this.curso = new Curso();
   
  }

  ngOnInit() {

    this.serviceCurso.obtenerCatalogoCursos().subscribe((data) => {
      this.cursos = data;
    });

  }


  onSubmit() {
    //this.feedback.fecha = new Date();
       this.serviceEncuesta.guardarEncuesta(this.encuesta).subscribe((data)=>{
        this.serviceEncuesta.mensajeRegistro.next('Registrado Correctamente...');
    }, (error) => {
      this.serviceEncuesta.mensajeRegistro.next('Error al guardar el feedback...');
    });
  }

}
