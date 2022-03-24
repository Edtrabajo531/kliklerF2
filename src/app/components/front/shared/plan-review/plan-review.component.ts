import { Component, OnInit } from '@angular/core';
import { UserplanService } from '../../../../services/front/userplan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-review',
  templateUrl: './plan-review.component.html',
  styleUrls: ['./plan-review.component.css']
})
export class PlanReviewComponent implements OnInit {
  userplan:any;
  loading = true;
  constructor(
    private userplanS:UserplanService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getPreview();
  }
  
  getPreview(){
    this.userplanS.getInReview().subscribe((data:any)=>{
      this.userplan = data;
      
      if(this.userplan == null){
        this.router.navigateByUrl('/planes');
      }
      this.loading = false;
    });
  }
  
}
