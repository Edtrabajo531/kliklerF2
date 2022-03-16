import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BankAccountsService } from '../../../../services/admin/bank-accounts.service';

@Component({
  selector: 'app-modal-edit-bank',
  templateUrl: './modal-edit-bank.component.html',
  styleUrls: ['./modal-edit-bank.component.css']
})
export class ModalEditBankComponent implements OnInit {
  @Input() data:any;
  form: FormGroup;
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
    private bankS:BankAccountsService,
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
        id: [this.data.id],

        name: [this.data.name, [Validators.required, Validators.minLength(2)]],
        holder: [
          this.data.holder,
          [Validators.required, Validators.minLength(4),Validators.maxLength(40)],
        ],
        identification: [this.data.identification, [Validators.required, this.validatorsS.number,Validators.max(999999999999)]],
        numberAccount: [this.data.numberAccount, [Validators.required,]],
        type: [this.data.type, [Validators.required]],
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

    this.bankS.update(this.form.value).subscribe(
      (response: any) => {
        console.log(response);
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

