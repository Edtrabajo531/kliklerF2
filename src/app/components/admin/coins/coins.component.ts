import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CoinsService } from 'src/app/services/admin/coins.service';



@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {
  @ViewChild('modalDelete') modalDelete: ElementRef;
  @ViewChild('modalCreate') modalCreate: ElementRef;
  @ViewChild('modalEdit') modalEdit: ElementRef;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  loading = true;
  dtTrigger: Subject<any> = new Subject<any>();
  formModalCreate = false;
  formModalEdit = false;
  dataModalEdit = [];
  reds: any;
  constructor(
    private coinsS:CoinsService,
    private modalS: NgbModal,
    config: NgbModalConfig,
    private ToastrS: ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.dtOptions = {
      order: [[0, "desc"]],
      lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todas"]],
      pageLength: 10,
      responsive: true,
      pagingType: 'full_numbers',
      dom: `<'row'<'col-md-6'l><'col-md-6 mb-2'f>r>
          t
          <'row'<'col-md-6'i><'col-md-6'p>>`,
      language: {
        "lengthMenu": `Filas _MENU_`,
        "zeroRecords": "Datos no disponibles",
        "info": "Página <b>_PAGE_</b> de <b>_PAGES_</b>",
        "infoEmpty": "Datos no disponibles",
        "infoFiltered": "( Filtrando de _MAX_ entradas )",
        search: '<span class="hide-sm" style="margin-right:-4px;padding:5px 13px 8px 14px;border:solid 1px var(--grey);border-top-left-radius:4px;border-bottom-left-radius:4px;border-right:none" ><i class="fa fa-search"></i></span>',
        searchPlaceholder: " Buscar",
        "paginate": {
          "first": "",
          "last": "",
          "next": "Sig.",
          "previous": "Ant."
        },
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.coinsS.list().subscribe((data: any) => {
          this.dtTrigger.next("");
          this.loading = false;
          this.reds = data.reds;
          data = data.list;

          callback({
            recordsTotal: data.total,
            recordsFiltered: data.to,
            data: data
          });
        });
      },
      columns: [
        {
          title: 'Id',
          data: 'id',
          width: '20',
        },
        {
          title: "Acciones",
          data: null,
          width:"50",
          orderable: true,
          render: (data, type, full) => {
            return `<div class="text-center"><button  class="mb-1 btn_edit btn btn-xs  btn-success" style="margin-right:5px"> <i class="fa fa-edit" ></i> </button><button  class="mb-1 btn_delete btn btn-xs  btn-danger"> <i class="fa fa-ban" ></i> </button></div>`;
          }
        },
        {
          title: "Nombre",
          data: 'name',
          orderable: true,
        },
        {
          title: "Red envío",
          data: null,
          width:"50",
          orderable: true,
          render: (data, type, full) => {
            let array = [];
            for(let red of data.reds){
              array.push(red.name)
            }
            return array;

          }
        },
      ],
      rowCallback: (row: Node, data: any | Object, index: number) => {
        const self = this;

        $('td .btn_delete', row).off('click');
        $('td .btn_delete', row).on('click', () => {
          self.openModalDelete(data.id);
        });

        $('td .btn_edit', row).off('click');
        $('td .btn_edit', row).on('click', () => {
          self.openModalEdit(data);
        });
      }
    };
  }

  receivedChild(message: any) {
    if (message == "hideModal") {
      this.modalS.dismissAll();
      this.formModalCreate = false;
      this.formModalEdit = false;
    } else if (message == "newData") {
      this.modalS.dismissAll();
      this.formModalCreate = false;
      this.formModalEdit = false;
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    } else if (message == true) {
      this.loading = true;
    } else if (message == false) {
      this.loading = false;
    }
  }

  openModalCreate() {
    this.formModalCreate = true;
    this.modalS.open(this.modalCreate, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      if (result === 'yes') {

      }
      return;
    }, (reason) => {
      return;
    });
  }

  openModalEdit(data: any) {
    this.dataModalEdit = data;
    this.formModalEdit = true;
    this.modalS.open(this.modalEdit, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      if (result === 'yes') {

      }
      return;
    }, (reason) => {
      return;
    });
  }

  openModalDelete(id: any) {
    this.modalS.open(this.modalDelete, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'yes') {
        this.delete(id);
      }
      return;
    }, (reason) => {
      return;
    });
  }

  delete(id: any) {
    this.loading = true;
    this.coinsS.delete(id).subscribe((data: any) => {
      if (data.result == 'ok') {
        this.ToastrS.success(data.message);
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.ajax.reload();
        });
      } else {

      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    //$.fn['dataTable'].ext.search.pop();
  }
}
