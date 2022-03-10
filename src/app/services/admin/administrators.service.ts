import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../AppConfig';

@Injectable({
  providedIn: 'root'
})
export class AdministratorsService {
  ENDPOINT = AppConfig.ENDPOINT;
  constructor(
    private http:HttpClient
  ) { }

  list(){
    return this.http.post(this.ENDPOINT + "administrators", "");
  }

  get(id:number){
    return this.http.post(this.ENDPOINT + "administrator/", {id:id});
  }

  store(data:any[]){
    return this.http.post(this.ENDPOINT + "administrator-store", data);
  }

  update(data:any[]){
    return this.http.post(this.ENDPOINT + "administrator-update", data);
  }

  disable(id:number){
    return this.http.post(this.ENDPOINT + "administrator-disable/"+id, "");
  }

  enable(id:number){
    return this.http.post(this.ENDPOINT + "administrator-enable/"+id, "");
  }
}
