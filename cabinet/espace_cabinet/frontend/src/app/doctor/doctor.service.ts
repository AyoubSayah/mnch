import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }
  url = 'http://localhost:3000/doctor';


  // Login doctor 
  LoginDoctor(doctor) {
    return this.http.post(`${this.url}/loginDoctor/`,doctor);
  }

  // Login doctor 
  RegisterDoctor(doctor) {
    return this.http.post(`${this.url}/registerDoctor/`,doctor);
  }

  // Update Doctor 
  UpateDoctor(doctor) {
    return this.http.post(`${this.url}/updateProfile/`+doctor._id,doctor);
  }

  // Listing secretaries 
  getSecretaries(doc_id) {
    return this.http.get(`${this.url}/allSecretaries/`+doc_id);
  }

  addSecretary(secretary,doc_id) {
    return this.http.get(`${this.url}/addSecretary/`+doc_id,secretary);
  }

  getDoctorById(id_doctor) {
    return this.http.get(`${this.url}/getDoc/`+id_doctor);
  }

  listSecWitoutDoc(){
    return this.http.get(`${this.url}/listSec`);
  }

  hireSecrt(id_sec , id_doc){
    return this.http.get(`${this.url}/hireSec/`+id_sec+`/`+id_doc);
  }

  unhireSecrt(id_sec , id_doc){
    return this.http.get(`${this.url}/unhire/`+id_sec+`/`+id_doc);
  }

  GetDoctorMessages(id_doctor) {
    return this.http.get(`${this.url}/listMsg/`+id_doctor);
  }

  DoctorAnswerPatient(msg,id_message) {
    return this.http.post(`${this.url}/answerMsg/`+id_message,msg);
  }

  // Get all doctor consultations ( not archived )
  getAllConsultations(id_doctor) {
    return this.http.get(`${this.url}/listConsult/`+id_doctor);
  }

  // Get all doctor consultations ( archived )
  getAllArchivedConsultations(id_doctor) {
    return this.http.get(`${this.url}/listConsultArchived/`+id_doctor);
  }

  // Archive consultation 
  archiveConsultation(id_consultation) {
    return this.http.get(`${this.url}/archiveConsult/`+id_consultation);
  }

  AddfileConsultation(file,id_consultation) {
    return this.http.post(`${this.url}/updateConsul/`+id_consultation,file);
  }

  listPayment(id,dateD,dateF) {
    var test = {
      dateD:dateD,
      dateF:dateF
    }
    return this.http.post(`${this.url}/listPayment/`+id,test);
  }

  GetAllConsultations(id_doctor) {
    return this.http.get(`${this.url}/GetAllConsultations/`+id_doctor);
  }

  getAllAppointments(id_doctor) {
    return this.http.get(`${this.url}/GetAllAppointments/`+id_doctor);
  }
  deletefile(idcons,idfile){
    return this.http.delete(`${this.url}/deletefile/`+ idcons + "/" + idfile)
  }
}
