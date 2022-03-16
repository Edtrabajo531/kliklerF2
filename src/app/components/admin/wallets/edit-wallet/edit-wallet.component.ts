import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';

import { WalletService } from 'src/app/services/admin/wallet.service';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.component.html',
  styleUrls: ['./edit-wallet.component.css']
})

export class EditWalletComponent implements OnInit {
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
    private walletS:WalletService
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
        id: [this.data.id, [Validators.required]],
        name: [this.data.name, [Validators.required]],
        address: [this.data.address, [Validators.required]],
        link: [this.data.link, []],
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

    this.walletS.update(this.form.value).subscribe(
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


