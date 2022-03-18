import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PlansService } from 'src/app/services/admin/plans.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { UserplanService } from '../../../../services/front/userplan.service';

@Component({
  selector: 'app-insert-amount',
  templateUrl: './insert-amount.component.html',
  styleUrls: ['./insert-amount.component.css']
})

export class InsertAmountComponent implements OnInit {
  @Input() userplan:any;
  form: FormGroup;
  bank: any;
  PasswordsEqual = true;
  confirmed = false;
  user: User;
  @Input() plan_id: any;
  @Output() sendToF = new EventEmitter<any>();
  @Output() sendToFstep = new EventEmitter<any>();
  @ViewChild('content') content: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private validatorsS: ValidatorsService,
    private toastrS: ToastrService,
    private router: Router,
    private planS: PlansService,
    private authS: AuthService,
    private activatedR: ActivatedRoute,
    private userplanS:UserplanService
  ) {}

  ngOnInit(): void {
    
    this.userplanS.get(this.userplan?.id).subscribe( (data:any)=>{
      this.userplan = data;
      this.formR();
    });
  }

  sendToFather(message: any) {
    this.sendToF.emit(message);
  }

  sendToFatherStep(value:number){
    this.sendToFstep.emit(value);
  }

  formR() {
    console.log(this.userplan);
    
    this.form = this.formBuilder.group(
      {
        id:[this.userplan.id],
        inversion: [this.userplan.inversion, [Validators.required,Validators.max(999999999999) ,this.validatorsS.float,Validators.min(this.userplan.cost) ]],
      });
    this.sendToFather('hideLoader');
  }

  submit() {
    this.sendToFather('showLoader');
    this.validatorsS.remove_errors_server(this.form);
    this.form.markAllAsTouched();
    if (this.form.status == 'INVALID') {
      this.sendToFather('hideLoader');
      return;
    }

    this.userplanS.insertAmount(this.form.value).subscribe(
      (response: any) => {
        let detect_errors_server = this.validatorsS.detect_errors_server(
          response,
          this.form
        );
        if (detect_errors_server) {
          this.sendToFather('hideLoader');
          return;
        }
        this.sendToFatherStep(4);
      },
      (error) => {
        console.log(error);
        
        this.sendToFather('hideLoader');
      }
    );
  }

  validate(name: string) {
    return this.validatorsS.sow_message(this.form, name);
  }
}