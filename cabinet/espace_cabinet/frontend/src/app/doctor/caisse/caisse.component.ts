import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorService } from '../doctor.service';
declare var $: any;
@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.css']
})
export class CaisseComponent implements OnInit {

  constructor(private doctor : DoctorService ) { }

  myDoctor;
  id_doc ;
  somme;
  dateD;
  dateF;
  sommeT;
  myConsultations : any;
  lengthConsultations;
  CountAllconsultations;
  
  ngOnInit(): void {
    this.myDoctor =  JSON.parse(localStorage.getItem('doctor'));
    this.id_doc = this.myDoctor._id
    this.doctor.GetAllConsultations(this.id_doc).subscribe((data: any)=> {
      this.CountAllconsultations = data.length;
      this.sommeT = 0 ;
      data.forEach(element => {
        this.sommeT += element.id_appointment.prix
      }); 
    })
  }

  getCaissePerdate(id,f : NgForm ){
    this.dateD = f.value.dateD+'T00:00:00.000+00:00';
    this.dateF = f.value.dateF+'T23:59:59.000+00:00';
    this.doctor.listPayment(id , this.dateD,this.dateF).subscribe((data : any)=>{
      this.myConsultations = data;
      this.lengthConsultations = data.length;
      this.somme = 0 ;
      data.forEach(element => {
        this.somme += element.id_appointment.prix
      }); 
    })
  }
}
