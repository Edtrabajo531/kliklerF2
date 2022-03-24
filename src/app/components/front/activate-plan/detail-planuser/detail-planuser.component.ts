import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserplanService } from '../../../../services/front/userplan.service';

@Component({
  selector: 'app-detail-planuser',
  templateUrl: './detail-planuser.component.html',
  styleUrls: ['./detail-planuser.component.css']
})

export class DetailPlanuserComponent implements OnInit {
  @Input() userplan:any;
  loading = true;
  @Output() sendToF = new EventEmitter<any>();
  @Output() sendToFstep = new EventEmitter<any>();
  constructor(
    private userplanS:UserplanService
  ) { }

  ngOnInit(): void {
    this.userplanS.get(this.userplan?.id).subscribe( (data:any)=>{
      this.userplan = data.userplan;
      this.loading = false;
      this.sendToFather("hideLoader");
    });
  }
 
  sendToFather(message: any) {
    this.sendToF.emit(message);
  }

  sendToFatherStep(value:number){
    this.sendToFstep.emit(value);
  }
}
