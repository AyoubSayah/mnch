import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  url = 'http://localhost:3000/admin';

  // Doctors 
  getAlldoctors() {
    return this.http.get(`${this.url}/listAll`);
  }

  deleteDoctor(id) {
    console.log(id);
    
    return this.http.get(`${this.url}/delete/`+id);
  }

  addDoctor(object) {
    return this.http.post(`${this.url}/addOne`,object);
  }

  updateDoctor(doctor) {
    return this.http.post(`${this.url}/update/`+doctor.id_user._id,doctor);
  }

  acceptDoctor(id_doctor) {
    return this.http.get(`${this.url}/acceptDoctor/`+id_doctor);
  }

  // Secretaries
  getAllSecretaries() {
    return this.http.get(`${this.url}/listAllSecretaries`);
  }

  addSecretary(secretary) {
    return this.http.post(`${this.url}/addOneSecretary`,secretary);
  }
  deleteSecretary(id) {
    return this.http.get(`${this.url}/deleteSec/`+id);
  }
  updateSecretary(secretary) {
    return this.http.post(`${this.url}/updateSec/`+secretary.id_user._id,secretary);
  }

  // Patients 
  getAllPatients() {
    return this.http.get(`${this.url}/listpatient`);
  }

  // Claims 
  getAllClaims() {
    return this.http.get(`${this.url}/listclaim`);
  }
  
  answerClaim(answer,id_claim) {
    return this.http.post(`${this.url}/answerclaim/`+id_claim,answer);
  }

  deleteClaim(id_claim) {
    return this.http.get(`${this.url}/deleteclaim/`+id_claim);
  }

  // appois
  getAllappois() {
    return this.http.get(`${this.url}/getAllRv`);
  }

  checkExistEmail(data) {
    return this.http.post(`${this.url}/existEmail`,data);
  }

  getAllNotifs() {
    return this.http.get(`${this.url}/getNotif/0`);
  }

  UpdateNotif() {
    return this.http.get(`${this.url}/updateNotifAdmin`);
  }

  getNotifsById(id) {
    return this.http.get(`${this.url}/getNotif/`+id);
  }
  
  updateNotifById(id) {
    return this.http.get(`${this.url}/updateNotif/`+id);
  }

}
