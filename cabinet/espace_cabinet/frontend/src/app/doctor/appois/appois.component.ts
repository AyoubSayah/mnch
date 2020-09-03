import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { appois } from '../../appois.model';
import { doctor } from 'src/app/doctor.model';
@Component({
  selector: 'app-appois',
  templateUrl: './appois.component.html',
  styleUrls: ['./appois.component.css']
})
export class AppoisComponent implements OnInit {

  constructor(private doctor: DoctorService) { }
  myDoctor: doctor;
  id_doctor;

  ngOnInit(): void {
    this.myDoctor = JSON.parse(localStorage.getItem('doctor'));
    this.id_doctor = this.myDoctor._id;
    this.loadAllAppointments();
  }

  appois: appois[];

  loadAllAppointments() {
    this.doctor.getAllAppointments(this.id_doctor).subscribe((data: appois[]) => {
      this.appois = data;
    });
  }
}
