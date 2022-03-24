import { Component, OnInit } from '@angular/core';
import { UserplanService } from '../../../services/front/userplan.service';

@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.css']
})
export class MyPlanComponent implements OnInit {
  userplan:any;
  loading = true;

  constructor( private userplanS:UserplanService) { }

  ngOnInit(): void {
    this.userplanS.myPlan().subscribe((data:any)=>{
      this.userplan = data.userplan;
      this.loading = false;
    });
  }
  
}
