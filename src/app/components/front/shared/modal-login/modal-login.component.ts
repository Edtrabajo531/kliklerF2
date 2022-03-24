import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})

export class ModalLoginComponent implements OnInit {
  form: FormGroup;
  user: User;
  loading = true;
  PasswordsEqual = true;
  confirmed = false;
  showMessage = 1;
  @Input() accountConfirmed:boolean;
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
        alias_or_email: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
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

    this.authS.login(this.form.value).subscribe(
      (response: any) => {
        this.sendToFather("hideLoader")
        this.loading = false;
        if(response.result == 'error'){
          this.toastrS.warning(response.message);
          return;
        }
        if(response.result == 'correo no verificado'){
          this.sendToFather("hideModal");
          this.sendToFather("modalResendEmail");

          
          return;
        }
        let detect_errors_server = this.validatorsS.detect_errors_server(response,this.form);
        if(detect_errors_server){
          return;
        }
        if (response?.token) {
          this.authS.saveAuth(response);
         if(response.role == 'administrador-p' || response.role == 'administrador'){
          this.sendToFather("hideModal")
           this.router.navigateByUrl('/admin');
         }else{
          
          window.location.reload();
         }
         
          // this.toastrS.success('Bienvenido: '+response.alias);
          return;
        }
        
        
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
