import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ToastrService } from 'ngx-toastr';
import {  ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-data-user',
  templateUrl: './add-data-user.component.html',
  styleUrls: ['./add-data-user.component.css']
})

export class AddDataUserComponent implements OnInit {

  form: FormGroup;
  bank:any;
  loading = true;
  PasswordsEqual = true;
  confirmed = false;
  plan_id:any;
  user:User;
  @Output() sendToF = new EventEmitter<any>();
  @Output() sendToFstep = new EventEmitter<any>();
  @ViewChild('content') content: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private validatorsS: ValidatorsService,
    private toastrS:ToastrService,
    private router:Router,
    private authS:AuthService,
    private activatedR:ActivatedRoute,
    
  ) {

  }

  sendToFather(message:any){
    this.sendToF.emit(message);
  }
  sendToFatherStep(value:number){
    this.sendToFstep.emit(value);
  }

  ngOnInit(): void {
    this.activatedR.parent?.params.subscribe((params:any)=>{
      this.plan_id = params['id'];
      this.authS.getAuthServer().subscribe((data:any)=>{
        this.user = data.user;
        this.formR();
      })
      
    });
   
  }

  formR() {
    this.form = this.formBuilder.group(
      {
        name: [this.user.name, [Validators.required]],
        document_type: [this.user.document_type, [Validators.required]],
        document_number: [this.user.document_number, [Validators.required, this.validatorsS.number,Validators.max(999999999999)]],
        date_of_birth: [this.user.date_of_birth, [Validators.required, this.validatorsS.date]],
      },
    );

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
  
  
    this.authS.updateDataPersonal(this.form.value).subscribe(
      (response: any) => {
        
        let detect_errors_server = this.validatorsS.detect_errors_server(response,this.form);
        if(detect_errors_server){
          this.sendToFather('hideLoader');
          return;
        }
        
        this.sendToFatherStep(2);
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

