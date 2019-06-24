import { Component, OnInit, Inject } from '@angular/core';
import { Persona  } from '../../../../_model/Persona';
import { PersonaService } from '../../../../_services/persona.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-nuevapersona',
  templateUrl: './nuevapersona.component.html',
  styleUrls: ['./nuevapersona.component.css']
})
export class NuevaPersonaComponent implements OnInit {

  persona: Persona;
  
  constructor(

    private personaService: PersonaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.persona = new Persona();
   }

  ngOnInit() {
    if(this.data != null && this.data.persona != null){
      this.persona = this.data.persona;
    }
  }

  onSubmit() {
    this.personaService.guardarPersona(this.persona).subscribe((data)=>{
        this.personaService.mensajeRegistro.next('Registrado Correctamente...');
    }, (error) => {
      this.personaService.mensajeRegistro.next('Error al guardar el registro...');
    });
  }

  buscarPreSeleccionado(persona1 : Persona, persona2: Persona){
    return persona1 && persona2 ? persona1.id === persona2.id : persona1 === persona2;
  }

}
