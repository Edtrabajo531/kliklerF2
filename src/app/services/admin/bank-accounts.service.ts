import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../AppConfig';

@Injectable({
  providedIn: 'root'
})
export class BankAccountsService {

  ENDPOINT = AppConfig.ENDPOINT;
  constructor(
    private http:HttpClient
  ) { }

  list(){
    return this.http.post(this.ENDPOINT + "admin/bank-accounts", "");
  }

  // get(id:number){
  //   return this.http.post(this.ENDPOINT + "bank-account/", {id:id});
  // }

  store(data:any[]){
    return this.http.post(this.ENDPOINT + "admin/bank-account-store", data);
  }

  update(data:any[]){
    return this.http.post(this.ENDPOINT + "admin/bank-account-update", data);
  }

  delete(id:number){
    return this.http.post(this.ENDPOINT + "admin/bank-account-delete/"+id, "");
  }

}
