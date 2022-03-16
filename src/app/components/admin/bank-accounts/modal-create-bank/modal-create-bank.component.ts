import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BankAccountsService } from '../../../../services/admin/bank-accounts.service';

@Component({
  selector: 'app-modal-create-bank',
  templateUrl: './modal-create-bank.component.html',
  styleUrls: ['./modal-create-bank.component.css']
})
export class ModalCreateBankComponent implements OnInit {
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
    private authS: AuthService,
    private validatorsS: ValidatorsService,
    private toastrS:ToastrService,
    private router:Router,
    private bankS:BankAccountsService
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
        name: ['', [Validators.required, Validators.minLength(2)]],
        holder: [
          '',
          [Validators.required, Validators.minLength(4),Validators.maxLength(40)],
        ],
        identification: ['', [Validators.required, this.validatorsS.number,Validators.max(999999999999)]],
        numberAccount: ['', [Validators.required, this.validatorsS.number]],
        type: ['', [Validators.required]],
      },

    );

    this.sendToFather(false)
  }

  submit() {
    this.sendToFather(true)
    this.validatorsS.remove_errors_server(this.form);
    this.form.markAllAsTouched();
    if (this.form.status == 'INVALID') {
      this.sendToFather(false)
      return;
    }

    this.bankS.store(this.form.value).subscribe(
      (response: any) => {
        this.sendToFather(false)
        let detect_errors_server = this.validatorsS.detect_errors_server(response,this.form);
        if(detect_errors_server){
          return;
        }
        this.toastrS.success(response.message);
        this.sendToFather("newData");
      },
      (error) => {
        this.sendToFather(false)
        console.log(error);
      }
    );
  }

  validate(name: string) {
    return this.validatorsS.sow_message(this.form, name);
  }
}
