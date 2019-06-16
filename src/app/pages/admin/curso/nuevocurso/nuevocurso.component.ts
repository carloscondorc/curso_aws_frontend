import { Component, OnInit, Inject } from '@angular/core';
import { Curso  } from '../../../../_model/Curso';
import { CursoService } from '../../../../_services/curso.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-nuevocurso',
  templateUrl: './nuevocurso.component.html',
  styleUrls: ['./nuevocurso.component.css']
})
export class NuevoCursoComponent implements OnInit {

  curso: Curso;
  
  constructor(

    private cursoService: CursoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.curso = new Curso();
   }

  ngOnInit() {
    if(this.data != null && this.data.curso != null){
      this.curso = this.data.curso;
    }
  }

  onSubmit() {
    this.cursoService.guardarCurso(this.curso).subscribe((data)=>{
        this.cursoService.mensajeRegistro.next('Registrado Correctamente...');
    }, (error) => {
      this.cursoService.mensajeRegistro.next('Error al guardar el registro...');
    });
  }

  buscarPreSeleccionado(curso1 : Curso, curso2: Curso){
    return curso1 && curso2 ? curso1.id === curso2.id : curso1 === curso2;
  }

}
