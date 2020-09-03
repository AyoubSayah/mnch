import { Component, OnInit } from '@angular/core';
import { consultation } from 'src/app/consultation.model';
import { DoctorService } from '../doctor.service';
import { doctor } from 'src/app/doctor.model';

@Component({
  selector: 'app-archived-cons',
  templateUrl: './archived-cons.component.html',
  styleUrls: ['./archived-cons.component.css']
})
export class ArchivedConsComponent implements OnInit {

  constructor(private doctor:DoctorService) { }

  myDoctor: doctor;
  myConsultations: consultation [];
  id_doctor;
  ngOnInit(): void {
    this.myDoctor =  JSON.parse(localStorage.getItem('doctor'));  
    this.id_doctor = this.myDoctor._id;
    this.loadAllArchivedConsultations();
  }

  loadAllArchivedConsultations() {
    this.doctor.getAllArchivedConsultations(this.id_doctor).subscribe((data: consultation []) => {
      this.myConsultations = data;
    });
  }

}
