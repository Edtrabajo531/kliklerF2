import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { PlansService } from '../../../../services/admin/plans.service';

@Component({
  selector: 'app-edit-lisence',
  templateUrl: './edit-lisence.component.html',
  styleUrls: ['./edit-lisence.component.css']
})

export class EditLisenceComponent implements OnInit {
  @Input() data: any;
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
        cost: [this.data.toString().replace('.',','), [Validators.required,Validators.max(999999999999) ,this.validatorsS.float]],
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

    this.planS.updateLicense(this.form.value).subscribe(
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

