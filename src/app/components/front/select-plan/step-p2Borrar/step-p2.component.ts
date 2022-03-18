import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan.model';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-step-p2',
  templateUrl: './step-p2.component.html',
  styleUrls: ['./step-p2.component.css']
})
export class StepP2Component implements OnInit {
  @Input() selectedPlan:Plan;
  payment:any;
  paymentBtc:any;
  @Output()
  sendToFather = new EventEmitter<any>();
  
  constructor(
    private router:Router,
    @Inject(PLATFORM_ID) private platformid: any,
  ) { }

  ngOnInit(): void {
    let cost:any = this.selectedPlan.cost;
    this.payment = ( cost * 25) / 100;
    this.paymentBtc = ( cost * 75) / 100;
  }
  
  sendToF(value:any){
    this.sendToFather.emit(value);
  }
  
  activePlan(){
    if (isPlatformBrowser(this.platformid)) {
      localStorage.setItem('activePlan', this.selectedPlan.id.toString() );
    }
    this.router.navigateByUrl('/activar-plan/'+this.selectedPlan.id);
  }
}
