import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/admin/plans.service';
import { ToastrService } from 'ngx-toastr';
import { Plan } from 'src/app/models/plan.model';
@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.css']
})
export class SelectPlanComponent implements OnInit {
  step = 1;
  plans:any;
  selectedPlan:Plan;
  constructor(
    private planS:PlansService,
    private toastrS:ToastrService

  ) { }

  ngOnInit(): void {
    this.listPlans();
  }
  
  listPlans(){
    this.planS.list().subscribe( (data:any) =>{
      this.plans = data;
    });
  }

  goStep2(){
    if(!this.selectedPlan){
      this.toastrS.warning('Debe seleccionar un plan antes de continuar.')
      return;
    }
    this.step = 2;
    this.toastrS.clear();
  }

  receivedChild(value:any){
    if(value == 'step1'){
      this.step = 1;
    }else if(value == 'step3'){
      this.step = 3;
    }
  }
}
