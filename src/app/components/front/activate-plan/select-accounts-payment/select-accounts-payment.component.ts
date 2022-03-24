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
import { User } from 'src/app/models/user.model';
import { UserplanService } from '../../../../services/front/userplan.service';

@Component({
  selector: 'app-select-accounts-payment',
  templateUrl: './select-accounts-payment.component.html',
  styleUrls: ['./select-accounts-payment.component.css']
})

export class SelectAccountsPaymentComponent implements OnInit {
  @Input() userplan:any;
  form: FormGroup;
  banks: any;
  wallets: any;
  PasswordsEqual = true;
  confirmed = false;
  user: User;
  selectedBank:any;
  selectedWallet:any;

  @Input() plan_id: any;
  @Output() sendToF = new EventEmitter<any>();
  @Output() sendToFstep = new EventEmitter<any>();
  @ViewChild('content') content: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private validatorsS: ValidatorsService,
    private toastrS: ToastrService,
    private userplanS:UserplanService
  ) {}

  ngOnInit(): void {
    
    this.userplanS.get(this.userplan?.id).subscribe( (data:any)=>{
      this.userplan = data.userplan;
      this.banks = data.banks;
      this.wallets = data.wallets;
      this.formR();
    });
  }

  sendToFather(message: any) {
    this.sendToF.emit(message);
  }

  sendToFatherStep(value:number){
    this.sendToFstep.emit(value);
  }

  showSelectedBank(event:any){
    let value = event.target.value;
    this.selectedBank = this.banks.filter(
      (bank: any) => bank.id == value
    );
  }

  showSelectedBtc(event:any){
    let value = event.target.value;
    this.selectedWallet = this.wallets.filter(
      (wallet: any) => wallet.id == value
    );
  }

  formR() {
    this.form = this.formBuilder.group(
      {
        id:[this.userplan.id],
        bank_id: [this.userplan?.bank_id, [Validators.required ]],
        wallet_id: [this.userplan?.bank_id, [Validators.required ]],
        
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

    this.userplanS.insertAccountsPayment(this.form.value).subscribe(
      (response: any) => {
        let detect_errors_server = this.validatorsS.detect_errors_server(
          response,
          this.form
        );
        if (detect_errors_server) {
          this.sendToFather('hideLoader');
          return;
        }
        this.sendToFatherStep(6);
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