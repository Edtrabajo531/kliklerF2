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
  
  updateLicense(data:any){
    return this.http.post(this.ENDPOINT + "admin/update-license", data);
  }

  activate_plan(id:number){
    return this.http.post(this.ENDPOINT + "activate-plan/"+id, "");
  }

  list(){
    return this.http.post(this.ENDPOINT + "plans", "");
  }

  get(id:number){
    return this.http.post(this.ENDPOINT + "admin/plan/", {id:id});
  }

  store(data:any[]){
    return this.http.post(this.ENDPOINT + "admin/plan-store", data);
  }

  update(data:any[]){
    return this.http.post(this.ENDPOINT + "admin/plan-update", data);
  }

  delete(id:number){
    return this.http.post(this.ENDPOINT + "admin/plan-delete/"+id, "");
  }
  
}
