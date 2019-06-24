import { Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from '../../../_model/Persona';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { PersonaService } from '../../../_services/persona.service';
import { NuevaPersonaComponent } from './nuevapersona/nuevapersona.component';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonaComponent implements OnInit {

  dataSource:MatTableDataSource<Persona>;
  totalElementos: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'nombres','apellidos','edad','profesion','lugar_trabajo','acciones'];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private personaService: PersonaService
  ) {
    this.dataSource = new MatTableDataSource<Persona>();
   }

  ngOnInit() {
    this.cargarTabla(0, 100, false);

    this.personaService.mensajeRegistro.subscribe((dato) => {
      this.dialog.closeAll();
      this.snackBar.open(dato, null, {
        duration: 1500,
      });
      this.cargarTabla(0, 100, false);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarMas(event){
    this.cargarTabla(event.pageIndex, event.pageSize, true);
  }

  cargarTabla(pageIndex: number, pageSize: number, desdePaginador: boolean){
    this.personaService.obtenerRegistros(pageIndex, pageSize).subscribe((datos) => {
      let registros = JSON.parse(JSON.stringify(datos)).content;
      this.dataSource = new MatTableDataSource<Persona>(registros);
      this.totalElementos = JSON.parse(JSON.stringify(datos)).totalElements;
      if(!desdePaginador){
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  eliminarPersona(id: number) {
    this.personaService.eliminarPersona(id).subscribe((data) => {
      this.personaService.mensajeRegistro.next('Dato eliminado correctamente...');
    });
  }

  actualizarPersona(persona: Persona) {
    this.dialog.open(NuevaPersonaComponent, {
      width: '80%',
      height: '80%',
      data: { persona: persona }
    });
  }

  openDialog() {
    this.dialog.open(NuevaPersonaComponent, {
      width: '80%',
      height: '80%'
    });
  }

}
