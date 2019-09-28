import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService, DataBaseService } from '@/_services';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '@/shared/modal/modal.component';
import swal from 'sweetalert';
import { paginatorTable } from '@/config';
import { ModalDetailComponent } from '@/shared/modal-detail/modal-detail.component';
import { ModalUploadFileComponent } from '@/shared/modal-upload-file/modal-upload-file.component';

@Component({
  selector: 'app-data-base',
  templateUrl: './data-base.component.html',
  styleUrls: []
})
export class DataBaseComponent implements OnInit {

  loading = false;
  displayedColumns: string[] = [
    'policy_id', 'statecode', 'county', 'eq_site_limit', 'hu_site_limit'];

    /*displayedColumns: string[] = [
      'policy_id', 'statecode', 'county', 'eq_site_limit', 'hu_site_limit',
      'fl_site_limit', 'fr_site_limit', 'tiv_2011', 'tiv_2012', 'eq_site_deductible', 'hu_site_deductible',
      'fl_site_deductible', 'fr_site_deductible','point_latitude','point_longitude','construction','point_granularity', 'actions'];*/
  dataSource = new MatTableDataSource();
  pages = paginatorTable;
  modalOption: NgbModalOptions = {};
  columns: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _database: DataBaseService,
    private alertService: AlertService,
    private modalService: NgbModal) {
    this.columns = [
      { header: 'Id Base de datos', key: 'id_data_base', pipe: '' },
      { header: 'Foto perfil', key: 'image_profile', pipe: 'image' },
      { header: 'Rol', key: 'role_name', pipe: '' },
      { header: 'Apellidos', key: 'lastname', pipe: '' },
      { header: 'Nombre', key: 'firstname', pipe: '' },
      { header: 'Curp', key: 'curp', pipe: '' },
      { header: 'Número de control', key: 'employee_number', pipe: '' },
      { header: 'Carrera', key: 'career_name', pipe: '' },
      { header: 'Turno', key: 'turn_name', pipe: '' },
      { header: 'Grado', key: 'degree_name', pipe: '' },
      { header: 'Grupo', key: 'group_name', pipe: '' },
      { header: 'Correo', key: 'email', pipe: '' },
      { header: 'Celular', key: 'phone_mobile', pipe: '' },
      { header: 'Creado por', key: 'created_by_name', pipe: '' },
      { header: 'Fecha de creación', key: 'created_at', pipe: 'date' },
      { header: 'Actualizado por', key: 'updated_by_name', pipe: '' },
      { header: 'Fecha de actualización', key: 'updated_at', pipe: 'date' }
    ];
  }

  ngOnInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.size = 'lg';
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this._database.getAll()
      .subscribe(
        (data: any) => {
          if (data.data) {
            this.dataSource.data = data.data;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;
          }
        },
        (error: any) => {
          this.alertService.error(error.message);
          this.loading = false;
        });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  info(row: any) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg', });
    modalRef.componentInstance.title = 'Movimientos';
    modalRef.componentInstance.table = row;
    modalRef.componentInstance.emitData.subscribe(($e: any) => {
      console.log('$e', $e);
    });
  }

  detail(row: any) {
    const modalRef = this.modalService.open(ModalDetailComponent, { size: 'lg', });
    modalRef.componentInstance.title = 'Detalle';
    modalRef.componentInstance.data = row;
    modalRef.componentInstance.columns = this.columns;
  }

  uploadFile() {
    const modalRef = this.modalService.open(ModalUploadFileComponent, { size: 'lg', });
    modalRef.componentInstance.title = 'Cargar base de datos';
    modalRef.componentInstance.id = '';
    modalRef.componentInstance.action = 'upload';
    modalRef.componentInstance.type = 'data-base';
  }

  delete(id: number) {
    swal({
      title: '¿Esta seguro?',
      text: 'Una vez eliminado, no podrá recuperar este elemento',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true
    })
      .then(confirm => {
        if (confirm) {
          this._database.delete(id)
            .subscribe(
              (data: any) => {
                this.alertService.success(data.message, true);
                this.getAll();
              },
              (error: any) => {
                this.alertService.error(error.message);
                this.loading = false;
              });
        }
      });
  }

}
