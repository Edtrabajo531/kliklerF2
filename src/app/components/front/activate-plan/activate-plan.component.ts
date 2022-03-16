import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/models/plan.model';
import { PlansService } from '../../../services/admin/plans.service';

@Component({
  selector: 'app-activate-plan',
  templateUrl: './activate-plan.component.html',
  styleUrls: ['./activate-plan.component.css']
})
export class ActivatePlanComponent implements OnInit {
  plan:Plan;
  constructor(
    private activatedR:ActivatedRoute,
    private planS:PlansService,
    private router:Router,


  ) { }

  ngOnInit(): void {
    
    
    this.activatedR.paramMap.subscribe((params:any)=>{
      let id = params.params.id;
      this.planS.activate_plan(id).subscribe((result:any)=>{
        if(result == 'no-existe'){
          this.router.navigateByUrl('/planes')
        }
        console.log(result);
        
        this.plan = result;
      })
    });
  }

}
