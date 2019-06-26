import { Curso } from './Curso';
import { Persona } from './Persona';

export class Encuesta {
    id: number;
    persona: Persona;
    curso:Curso;

    constructor(){
        this.persona = new Persona();
        this.curso = new Curso();
    }

}