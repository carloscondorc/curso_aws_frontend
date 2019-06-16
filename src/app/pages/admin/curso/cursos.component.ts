import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../../../_model/Curso';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { CursoService } from '../../../_services/curso.service';
import { NuevoCursoComponent } from './nuevocurso/nuevocurso.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursoComponent implements OnInit {

  dataSource:MatTableDataSource<Curso>;
  totalElementos: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'curso'];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cursoService: CursoService
  ) {
    this.dataSource = new MatTableDataSource<Curso>();
   }

  ngOnInit() {
    this.cargarTabla(0, 100, false);

    this.cursoService.mensajeRegistro.subscribe((dato) => {
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
    this.cursoService.obtenerRegistros(pageIndex, pageSize).subscribe((datos) => {
      let registros = JSON.parse(JSON.stringify(datos)).content;
      this.dataSource = new MatTableDataSource<Curso>(registros);
      this.totalElementos = JSON.parse(JSON.stringify(datos)).totalElements;
      if(!desdePaginador){
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  eliminarCurso(id: number) {
    this.cursoService.eliminarCurso(id).subscribe((data) => {
      this.cursoService.mensajeRegistro.next('Dato eliminado correctamente...');
    });
  }

  actualizarCurso(sede: Curso) {
    this.dialog.open(NuevoCursoComponent, {
      width: '80%',
      height: '80%',
      data: { sede: sede }
    });
  }

  openDialog() {
    this.dialog.open(NuevoCursoComponent, {
      width: '80%',
      height: '80%'
    });
  }

}
