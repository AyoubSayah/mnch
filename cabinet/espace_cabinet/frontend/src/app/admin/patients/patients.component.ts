import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { patient } from 'src/app/patient.model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  constructor(private admin:AdminService) { }

  searchPatient;
  patients : patient [];
  emptyBool;
  cdn = 'http://localhost:4000/uploads/' ;
  ngOnInit(): void {
    this.loadAllPatients();
  }

  // Load all doctors
  loadAllPatients() {
    this.admin.getAllPatients().subscribe((data: patient []) => {
      this.patients = data;
      if (data.length > 0) {
        this.emptyBool = false;
      }else{
        this.emptyBool = true;
      }
    })
  }

}
