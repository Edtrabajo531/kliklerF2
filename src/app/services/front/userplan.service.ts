import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../AppConfig';

@Injectable({
  providedIn: 'root'
})

export class UserplanService {
  ENDPOINT = AppConfig.ENDPOINT;
  constructor(
    private http:HttpClient
  ) { }

  get(id:number){
    return this.http.post(this.ENDPOINT + "get-plan-user", {id:id});
  }

  insertAmount(value:any){
    return this.http.post(this.ENDPOINT + "insert-amount-plan",value );
  }

  // get_accounts_payment(value:any){
  //   return this.http.post(this.ENDPOINT + "get-accounts-payment",value );
  // }
  
  
}
