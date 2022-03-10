import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/AppConfig';
import { HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  ENDPOINT = AppConfig.ENDPOINT;
  constructor(private http:HttpClient) { 
    
  }

}
