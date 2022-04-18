import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../AppConfig';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
  ENDPOINT = AppConfig.ENDPOINT;
  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.post(this.ENDPOINT + "admin/list-coins", "");
  }

  store(data: any[]) {
    return this.http.post(this.ENDPOINT + "admin/coins-store", data);
  }

  update(data: any[]) {
    return this.http.post(this.ENDPOINT + "admin/coins-update", data);
  }

  delete(id: number) {
    return this.http.post(this.ENDPOINT + "admin/coins-delete", {id:id});
  }

}
