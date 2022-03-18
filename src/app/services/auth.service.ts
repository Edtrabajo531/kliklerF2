import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppConfig } from 'src/app/AppConfig';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
// import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  ENDPOINT = AppConfig.ENDPOINT;


  urlRefreshToken = 'refresh-token';
  urlLogout = 'logout';
  urlAuthenticated = "authenticated";
  userAuth: any;
  redirectNoAuth = "";
  // usuario que verifico sus datos con fotos
  url_verified = "usuario-verificado";
  url_verify_data_document = "verify-data-document";
  url_verify_data_contact = "verify-data-contact";
  url_user_data = "get-user-data";


  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformid: any, 
  // private toastrS: ToastrService
  ) { }

  // refreshToken() {
  //   let auth = this.getAuth();
  //   return this.http.post(this.ENDPOINT + this.urlRefreshToken, this.getAuth()).pipe(tap(auth => this.saveAuth(auth)));
  // }
  getAuthServer(){
    return this.http.post(this.ENDPOINT + "get-auth", "");
  }

  recover_password_request(values:any){
    return this.http.post(this.ENDPOINT + "recover-password-request", values);
  }
  recover_password(values:any){
    return this.http.post(this.ENDPOINT + "recover-password", values);
  }

  token_password_verified(email:string,token:string){
    return this.http.post(this.ENDPOINT + "recover-password-verify", {email:email,token:token});
  }

  register(values: any) {
    return this.http.post(this.ENDPOINT + "register", values);
  }

  login(values: any) {
    return this.http.post(this.ENDPOINT + "login", values);
  }

  resend_email_confirm(data: any) {
    return this.http.post(this.ENDPOINT + "resend-email-confirm" + "/" + data.email, "");
  }

  saveAuth(user: User) {
    let userAuth: any = user;
    if (isPlatformBrowser(this.platformid)) {
      localStorage.setItem('user', JSON.stringify(userAuth));
    }
    this.router.navigate([this.redirectNoAuth]);
  }

  Authenticated() {
    return this.http.post(this.ENDPOINT + this.urlAuthenticated, "")
  }

  getAuth() {
    if (isPlatformBrowser(this.platformid)) {
      let user: any = localStorage.getItem('user');
      if (user != undefined && user != null) {
        var array: any = localStorage.getItem('user');
        array = JSON.parse(array);
        return array;
      }
      return user;
    }
  }

  getUser() {
    return this.http.post(this.ENDPOINT + this.url_user_data,"");
  }

  logout() {
    if (isPlatformBrowser(this.platformid)) {
      localStorage.removeItem('user');
      if(this.router.url == '/'){
        if(isPlatformBrowser(this.platformid)){
           window.location.href ="/";
        }

      }else{
        this.router.navigateByUrl('/');
      }
    }
  }

  verified(id:number) {
    return this.http.post(this.ENDPOINT + this.url_verified,"");
  }

  updateDataPersonal(data:any){
    return this.http.post(this.ENDPOINT + "update-data-personal", data);
  }
  updateDataContact(data:any){
    return this.http.post(this.ENDPOINT + "update-data-contact", data);
  }
  // agrega ciudades desde a la bd solo se uso un vez
  add_cities(data:any){
    return this.http.post(this.ENDPOINT + "add-cities", {states:data});
  }

  getCities(id:number){
    return this.http.post(this.ENDPOINT + "get-cities-select", {id:id});
  }

  upload_files(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', this.ENDPOINT+'upload-image', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getImagesVerification(){
    return this.http.post(this.ENDPOINT + "get-images-verification", "");
  }

  delete_img(id:number){
    return this.http.post(this.ENDPOINT + "delete-images-verification", {id:id})
  }

  data_verification_request(){
    return this.http.post(this.ENDPOINT + "data-verification-request", "");
  }

}
