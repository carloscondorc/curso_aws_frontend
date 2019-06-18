import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { NuevaEncuestaComponent } from './nueva/nuevaencuesta.component';
import { Encuesta } from 'src/app/_model/encuesta';
import { EncuestaService } from 'src/app/_services/encuesta.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  dataSource:MatTableDataSource<Encuesta>;
  totalElementos: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'eleccion', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private serviceEncuesta: EncuestaService,
    private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<Encuesta>();
  }

  ngOnInit() {
    this.cargarTabla(0, 100, false);

    this.serviceEncuesta.mensajeRegistro.subscribe((dato) => {
      this.dialog.closeAll();
      this.snackBar.open(dato, null, {
        duration: 1500,
      });
      this.cargarTabla2();
      //this.cargarTabla(0, 100, false);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarMas(event){
    this.cargarTabla(event.pageIndex, event.pageSize, true);
  }

  cargarTabla(pageIndex: number, pageSize: number, desdePaginador: boolean){
    this.serviceEncuesta.obtenerEncuestasPropias(pageIndex, pageSize).subscribe((datos) => {
      let encuestas = JSON.parse(JSON.stringify(datos)).content;
      this.dataSource = new MatTableDataSource<Encuesta>(encuestas);
      this.totalElementos = JSON.parse(JSON.stringify(datos)).totalElements;
      if(!desdePaginador){
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  cargarTabla2(){
    this.serviceEncuesta.obtenerCatalogoEncuestas().subscribe((datos) => {
      let encuestas = JSON.parse(JSON.stringify(datos)).content;
      this.dataSource = new MatTableDataSource<Encuesta>(encuestas);
      this.totalElementos = JSON.parse(JSON.stringify(datos)).totalElements;
       });
  }

  eliminarEncuesta(id: number) {
    this.serviceEncuesta.eliminarEncuesta(id).subscribe((data) => {
      this.serviceEncuesta.mensajeRegistro.next('Dato eliminado correctamente...');
    });
  }

  openDialog() {
    this.dialog.open(NuevaEncuestaComponent, {
      width: '80%',
      height: '80%'
    });
  }

}
