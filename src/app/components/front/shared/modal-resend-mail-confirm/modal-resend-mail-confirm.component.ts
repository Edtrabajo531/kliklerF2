import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-modal-resend-mail-confirm',
  templateUrl: './modal-resend-mail-confirm.component.html',
  styleUrls: ['./modal-resend-mail-confirm.component.css']
})

export class ModalResendMailConfirmComponent implements OnInit {
  showMessage = false;
  form: FormGroup;
  user: User;
  loading = true;
  PasswordsEqual = true;
  confirmed = false;
  @Input() errorAccountConfirmed:boolean;

  @Output() sendToF = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private authS: AuthService,
    private validatorsS: ValidatorsService,
    private router:Router,
    private toastrS:ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  
  sendToFather(message:any){
    this.sendToF.emit(message);
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        
      },
    );
    this.sendToFather("hideLoader")
  }

  submit() {
    this.sendToFather("showLoader")
    this.validatorsS.remove_errors_server(this.form);
    this.form.markAllAsTouched();
    if (this.form.status == 'INVALID') {
      this.sendToFather("hideLoader")
      return;
    }

    this.authS.resend_email_confirm(this.form.value).subscribe(
      (response: any) => {
        this.sendToFather("hideLoader")
         console.log(response);
         
        if(response.result == 'error'){
          this.toastrS.warning(response.message);
          return;
        }
    
        let detect_errors_server = this.validatorsS.detect_errors_server(response,this.form);
        if(detect_errors_server){
          return;
        }
        this.showMessage = true;
        // this.toastrS.success(response.message);
        // this.sendToFather("hideModal")
      },
      (error) => {
        this.sendToFather("hideLoader")
        console.log(error);
      }
    );
  }

  validate(name: string) {
    return this.validatorsS.sow_message(this.form, name);
  }
}

