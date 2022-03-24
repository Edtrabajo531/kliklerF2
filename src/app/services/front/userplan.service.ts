import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { AppConfig } from '../../AppConfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserplanService {
  ENDPOINT = AppConfig.ENDPOINT;
  constructor(private http: HttpClient) {}
  // front
  activatePlan(id: number) {
    return this.http.post(this.ENDPOINT + 'admin/activate-plan', {
      id: id,
    });
  }
  rejectPlan(id: number,observations:string) {
    return this.http.post(this.ENDPOINT + 'admin/reject-plan', {
      id: id,
      observations:observations
    });
  }
  // admin
  list() {
    return this.http.post(this.ENDPOINT + 'admin/list-user-plan', '');
  }
  
  getAdmin(id: number) {
    return this.http.post(this.ENDPOINT + 'admin/get-plan-user-admin', {
      id: id,
    });
  }

  myPlan(){
    return this.http.post(this.ENDPOINT + 'my-plan', "");
  }

  get(id: number) {
    return this.http.post(this.ENDPOINT + 'get-plan-user', { id: id });
  }

  sendRequestActivation(id: any) {
    return this.http.post(this.ENDPOINT + 'request-activation-userplan', {
      id: id,
    });
  }

  insertAmount(value: any) {
    return this.http.post(this.ENDPOINT + 'insert-amount-plan', value);
  }

  insertAccountsPayment(value: any) {
    return this.http.post(this.ENDPOINT + 'insert-accounts-payment', value);
  }

  getImages(value: any) {
    return this.http.post(this.ENDPOINT + 'images-pay-plan', value);
  }

  upload_files(file: File, id: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest(
      'POST',
      this.ENDPOINT + 'upload-file-userplan?id=' + id,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }

  delete_img(id: number) {
    return this.http.post(this.ENDPOINT + 'delete-file-userplan', { id: id });
  }

  getInReview() {
    return this.http.post(this.ENDPOINT + 'plan-under-review', '');
  }

  // get_accounts_payment(value:any){
  //   return this.http.post(this.ENDPOINT + "get-accounts-payment",value );
  // }
}
