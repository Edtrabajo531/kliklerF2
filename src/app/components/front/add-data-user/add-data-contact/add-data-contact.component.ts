import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PlansService } from 'src/app/services/admin/plans.service';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-data-contact',
  templateUrl: './add-data-contact.component.html',
  styleUrls: ['./add-data-contact.component.css'],
})
export class AddDataContactComponent implements OnInit {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  onlyCountries: CountryISO[] = [CountryISO.Ecuador];
  form: FormGroup;
  bank: any;
  loading = true;
  PasswordsEqual = true;
  confirmed = false;
  states: any = [];
  cities: any = [];
  citiesFilter: any = [];
  user: User;
  plan_id: any;
  @Output() sendToF = new EventEmitter<any>();
  @Output() sendToFstep = new EventEmitter<any>();
  @ViewChild('content') content: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private validatorsS: ValidatorsService,
    private toastrS: ToastrService,
    private router: Router,
    private planS: PlansService,
    private authS: AuthService,
    private activatedR: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedR.parent?.params.subscribe((params:any)=>{
      this.plan_id = params['id'];
     
    });

    this.authS.getAuthServer().subscribe((data: any) => {
      this.user = data.user;
      this.states = data.states;
      this.cities = data.cities;
      this.filterCities(data.user.state_id);
     console.log(data);
     
      
      this.formR();
    });
  }

  sendToFather(message:any){
    this.sendToF.emit(message);
  }

  sendToFatherStep(value:number){
    this.sendToFstep.emit(value);
  }

  filterCities(event: any) {
   
    let id: any;
    if (event?.target) {
      id = event.target.value;
      this.citiesFilter = this.cities.filter(
        (city: any) => city.state_id == id
      );
      if (this.citiesFilter.length != 0) {
        this.form.controls['city_id'].enable();
      } else {
        this.form.controls['city_id'].disable();
      }
      this.form.controls['citiesCount'].setValue(this.cities.length);
    } else {
      id = event;
     
      
      this.citiesFilter = this.cities.filter(
        (city: any) => city.state_id == id
      );
      console.log(this.citiesFilter);
      
    }
  }

  formR() {
    this.form = this.formBuilder.group(
      {
        phone: [this.phone(this.user.phone), [Validators.required]],
        phone2: [this.phone(this.user.phone2)],
        state_id: [this.user?.state_id, [Validators.required]],
        city_id: [this.user?.city_id],
        address: [this.user?.address],
        citiesCount: [this.citiesFilter.length],
      },
      { validator: this.validatorsS.cityRequired }
    );
    this.sendToFather('hideLoader');
  }
  
  phone(value:any){
    if(value){
      let phone = JSON.parse(value);
      return phone.number;
    }
     return;
  }  

  submit() {
    this.sendToFather('showLoader');
    this.validatorsS.remove_errors_server(this.form);
    this.form.markAllAsTouched();
    if (this.form.status == 'INVALID') {
      this.sendToFather('hideLoader');
      return;
    }

    this.authS.updateDataContact(this.form.value).subscribe(
      (response: any) => {
        this.loading = false
        let detect_errors_server = this.validatorsS.detect_errors_server(
          response,
          this.form
        );
        if (detect_errors_server) {
          return;
        }
        this.sendToFatherStep(3);
      },
      (error) => {
        this.loading = false
        console.log(error);
      }
    );
  }

  validate(name: string) {
    return this.validatorsS.sow_message(this.form, name);
  }
}
