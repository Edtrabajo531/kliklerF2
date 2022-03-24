import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UserplanService } from '../../../services/front/userplan.service';

@Component({
  selector: 'app-userplan',
  templateUrl: './userplan.component.html',
  styleUrls: ['./userplan.component.css']
})

export class UserplanComponent implements OnInit {
  @ViewChild('modalCheck') modalCheck: ElementRef;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  loading = true;
  dtTrigger: Subject<any> = new Subject<any>();
  formCheck = false;
  plan_id:any;
  dataEdit = [];
  @ViewChild('input_status') input_status: ElementRef;
  constructor(
    private userplanS: UserplanService,
    private router: Router,
    private modalS: NgbModal,
    config: NgbModalConfig,
    private ToastrS:ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.dtOptions = {
      order: [[3, "desc"]],
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
        this.userplanS.list().subscribe((data: any) => {
          console.log(data);
          
          this.dtTrigger.next("");
          this.loading = false;
          callback({
            recordsTotal: data.total,
            recordsFiltered: data.to,
            data: data.list
          });
        });
      },
      columns: [
        {
          title: 'Estatus-hide',
          data: 'status',
          visible: false
        },
        {
          title: 'Id',
          data: 'id',
          width: '20',
        },
        {
          title: "Acciones",
          data: null,
          width:"10",
          orderable: true,
          render: (data, type, full) => {
            if(data.status == 'revision'){
              return `<div class="text-center"><button  class="mb-1 btn_check btn btn-xs  btn-success" style="margin-right:5px"> <i class="fa fa-check" ></i> </button></div>`;
            }else{
              return `<div class="text-center"><button  class="mb-1 btn_check btn btn-xs  btn-secondary" style="margin-right:5px"> <i class="fa fa-check" ></i> </button></div>`;
            }
          }
        },
        {
          title: "Fecha",
          orderable: true,
          data: null,
          render: (data, type, full) => {
            return data.date_request;
          }
        },
        {
          title: "Estatus",
          orderable: true,
          data: null,
          render: (data, type, full) => {
            if(data.status == 'revision'){
              return "<span class='text-green'>Pendiente</span>";
            }else if(data.status == 'rechazado'){
              return "<span class='text-danger'>Rechazado</span>";
            }else if(data.status == 'finalizado'){
              return "<span class='text-secondary'>Completado</span>";
            }else if(data.status == 'activo'){
              return "<span class='y'>Activo</span>";
            }
          }
        },
        {
          title: "Usuario",
          data: 'user_alias',
          orderable: true,
        },
        {
          title: "Plan",
          data: 'name',
          orderable: true,
        },
        {
          title: "Inversion",
          orderable: true,
          data: null,
          render: (data, type, full) => {
            return data.inversion.toString().replace('.',',')+" $";
          }
          
        },
        {
          title: 'Mínimo',
          data:null,
          render: (data, type, full) => {
            return data.cost.toString().replace('.',',')+" $";
          }
        },
        {
          title: "Ganancia (mes)",
          data: null,
          render: (data, type, full) => {
            return data.profit.toString().replace('.',',')+" %";
          }
        },
       
        {
          title: "Duración",
          data: null,
          orderable: true,
          render: (data, type, full) => {
            if(data.name == 'Gratis'){
              return '<i class="fas fa-infinity text-muted"></i>'
            }else{
              return data.duration+" mes(es)";
            }
          }
        },

        {
          title: "Limite Prod.",
          data: 'products',
          orderable: true,
        },

      ],
      rowCallback: (row: Node, data: any | Object, index: number) => {
        const self = this;
        $('td .btn_check', row).off('click');
        $('td .btn_check', row).on('click', () => {
          self.openModalCheck(data.id);
        });
      
      }
    };
  }
  
  hideForms(){
    let self = this;
    setTimeout(function(){
      self.formCheck = false;
    },100);
  }

  receivedChild(message: any) {
    
    if (message == "newData") {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
        this.modalS.dismissAll();
        this.hideForms();
      });
    } else if (message == 'showLoader') {
      this.loading = true;
    } else if (message == 'hideModal') {
      this.modalS.dismissAll();
      this.hideForms();
    } else if (message == 'hideLoader') {
      this.loading = false;
    }
  }

  openModalCheck( id: any) {
    this.loading = true;
    this.plan_id = id;
    this.formCheck = true;
    this.modalS.open(this.modalCheck, { ariaLabelledBy: 'modal-basic-title',size: 'lg' }).result.then((result) => {
      if (result === 'yes') {
      
      }
      return;
    }, (reason) => {
      return;
    });
  }
  
  applyfilters() {
    let value = this.input_status.nativeElement.value;
    this.filterStatus(value);
  }

  filterStatus(event: any) {
    if (event?.target) {
      var status = event.target.value;
      console.log(event.target.value);
      var draw = false;
    } else {
      var draw = true;
      var status = event;
    }

    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search('').column(0).search(status, true, false, true).draw(draw);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

