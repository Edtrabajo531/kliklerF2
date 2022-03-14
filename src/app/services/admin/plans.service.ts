import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../AppConfig';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  ENDPOINT = AppConfig.ENDPOINT;
  constructor(
    private http:HttpClient
  ) { }

  list(){
    return this.http.post(this.ENDPOINT + "plans", "");
  }

  get(id:number){
    return this.http.post(this.ENDPOINT + "plan/", {id:id});
  }

  store(data:any[]){
    return this.http.post(this.ENDPOINT + "plan-store", data);
  }

  update(data:any[]){
    return this.http.post(this.ENDPOINT + "plan-update", data);
  }

  delete(id:number){
    return this.http.post(this.ENDPOINT + "plan-delete/"+id, "");
  }
  
}
