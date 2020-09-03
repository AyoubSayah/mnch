import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecretaryService {

  constructor(private http:HttpClient) { }
  url = 'http://localhost:3000/secretary';

  //login Secretary
  loginSec(Secrt){
    return this.http.post(`${this.url}/loginSec/`,Secrt);
  }
  //login Secretary
  RegisterSec(Secrt){
    return this.http.post(`${this.url}/registerSec/`,Secrt);
  }
  UpdateSec(id,Secrt){
    return this.http.post(`${this.url}/updateProfile/`+id ,Secrt);
  }
  //List RV Secretary
  ListRv(id){
    return this.http.get(`${this.url}/listRv/`+id);
  }
  //Accept RV Secretary
  AcceptRV(id , form){
    return this.http.post(`${this.url}/acceptRv/`+id , form);
  }
  //Delete RV Secretary
  CancelRV(id){
    return this.http.get(`${this.url}/cancelRv/`+id);
  }

}
