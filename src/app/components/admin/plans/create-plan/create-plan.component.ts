import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { PlansService } from '../../../../services/admin/plans.service';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})

export class CreatePlanComponent implements OnInit {
  form: FormGroup;
  bank:any;
  loading = true;
  PasswordsEqual = true;
  confirmed = false;
  @Output()
  sendToF = new EventEmitter<any>();
  @ViewChild('content') content: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private validatorsS: ValidatorsService,
    private toastrS:ToastrService,
    private router:Router,
    private planS:PlansService
  ) {

  }

  sendToFather(message:any){
    this.sendToF.emit(message);
  }

  ngOnInit(): void {
    this.formR();
  }

  formR() {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        cost: ['', [Validators.required,Validators.max(999999999999) ,this.validatorsS.float]],
        profit: ['', [Validators.required, Validators.max(100),this.validatorsS.float]],
        duration: ['', [Validators.required, this.validatorsS.number,Validators.min(1)]],
        // charge_limit: ['', [Validators.required, Validators.max(999999999999),this.validatorsS.float]],
        products: ['', [Validators.required, this.validatorsS.number,Validators.min(1)]],
      },

    );

    this.sendToFather('hideLoader');
  }

  submit() {
    this.sendToFather('showLoader');
    this.validatorsS.remove_errors_server(this.form);
    this.form.markAllAsTouched();
    if (this.form.status == 'INVALID') {
      this.sendToFather('hideLoader')
      return;
    }

    this.planS.store(this.form.value).subscribe(
      (response: any) => {
        this.sendToFather('hideLoader');
        let detect_errors_server = this.validatorsS.detect_errors_server(response,this.form);
        if(detect_errors_server){
          return;
        }
        this.toastrS.success(response.message);
        this.sendToFather("newData");
      },
      (error) => {
        this.sendToFather('hideLoader');
        console.log(error);
      }
    );
  }

  validate(name: string) {
    return this.validatorsS.sow_message(this.form, name);
  }
}
