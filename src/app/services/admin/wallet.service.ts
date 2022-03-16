import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../AppConfig';

@Injectable({
  providedIn: 'root'
})

export class WalletService {
  ENDPOINT = AppConfig.ENDPOINT;
  constructor(
    private http:HttpClient
  ) { }

  list(){
    return this.http.post(this.ENDPOINT + "admin/wallets", "");
  }

  get(id:number){
    return this.http.post(this.ENDPOINT + "admin/wallet/", {id:id});
  }

  store(data:any[]){
    return this.http.post(this.ENDPOINT + "admin/wallet-store", data);
  }

  update(data:any[]){
    return this.http.post(this.ENDPOINT + "admin/wallet-update", data);
  }

  delete(id:number){
    return this.http.post(this.ENDPOINT + "admin/wallet-delete/"+id, "");
  }
}
