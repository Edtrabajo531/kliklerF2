import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { log } from 'console';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {
  form: FormGroup;
  user: User;
  loading = true;
  PasswordsEqual = true;
  confirmed = false;
  showMessage = false;
        
  @Output() sendToF = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private authS: AuthService,
    private validatorsS: ValidatorsService,
    private router:Router,
    
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
        alias: ['', [Validators.required, Validators.minLength(4)]],
        email: [
          '',
          [Validators.required, this.validatorsS.email],
        ],
        name: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_repeat: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
      },
      { validator: this.passwordCompare }
    );

    this.loading = false;
  }

  passwordCompare(frm: FormGroup) {
    if (
      frm.controls['password'].touched &&
      frm.controls['password_repeat'].touched &&
      frm.controls['password'].value != frm.controls['password_repeat'].value
    ) {
      return { PasswordsNotEqual: true };
    } else {
      return;
    }

  }

  submit() {
    this.sendToFather("showLoader")
    this.validatorsS.remove_errors_server(this.form);
    this.form.markAllAsTouched();
    if (this.form.status == 'INVALID') {
      this.sendToFather("hideLoader")
      return;
    }
  
    this.authS.register(this.form.value).subscribe(
      (response: any) => {
        console.log(response);
        this.sendToFather("hideLoader")
        let detect_errors_server = this.validatorsS.detect_errors_server(response,this.form);
        if(detect_errors_server){
          return;
        }
        this.showMessage = true;
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
