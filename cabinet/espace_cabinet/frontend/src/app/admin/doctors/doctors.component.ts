import { Component, OnInit } from '@angular/core';
import { doctor } from '../../doctor.model';
import { AdminService } from '../admin.service';
import { secretary } from 'src/app/secretary.model';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var $: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor(private admin:AdminService,private _flashMessagesService: FlashMessagesService) {}

  ad : doctor [];
  secretaries : secretary [];
  doctor;
  searchDoctor;
  emptyBool;
  deleteid;
  modify = false;
  doc_id;
  mydoctor: doctor;

  ngOnInit(): void {
    this.loadAllDoctors();
  }
  // Load all doctors
  loadAllDoctors() {
    this.admin.getAlldoctors().subscribe((data: doctor []) => {
      this.ad = data;
      if (data.length > 0) {
        this.emptyBool = false;
      }else{
        this.emptyBool = true;
      }
    })
  }

  // Click to show doctor informations 
  doctorInfo(doctor) {
    console.log(doctor);
    
    this.mydoctor = doctor;
    console.log(this.mydoctor);

  }

  // Delete doctor by id
  deleteD(id) {
    this.admin.deleteDoctor(this.mydoctor._id).subscribe(() => {
      this.loadAllDoctors();
      this._flashMessagesService.show('Docteur supprimé avec success', { cssClass: 'alert-success', timeout: 2000 });
    })
  }

  accept(id_doctor) {
    this.admin.acceptDoctor(id_doctor).subscribe(() => {})
    this.loadAllDoctors();
  }

}
