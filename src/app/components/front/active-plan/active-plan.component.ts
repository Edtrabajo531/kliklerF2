import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-active-plan',
  templateUrl: './active-plan.component.html',
  styleUrls: ['./active-plan.component.css']
})

export class ActivePlanComponent implements OnInit {
  plan:string;
  constructor(
    private activatedR:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedR.queryParams.subscribe((params:any)=>{
      console.log(params);
      // this.getPlanName();
    });
    
  }
  
  activate_plan(plan:string){

  }
}
