import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserplanService } from '../../../../services/front/userplan.service';

@Component({
  selector: 'app-detail-planuser',
  templateUrl: './detail-planuser.component.html',
  styleUrls: ['./detail-planuser.component.css']
})

export class DetailPlanuserComponent implements OnInit {
  @Input() userplan:any;
  @Output() sendToF = new EventEmitter<any>();
  @Output() sendToFstep = new EventEmitter<any>();
  constructor(
    private userplanS:UserplanService
  ) { }

  ngOnInit(): void {
    this.userplanS.get(this.userplan?.id).subscribe( (data:any)=>{
      this.userplan = data;
      console.log(data);
      
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
