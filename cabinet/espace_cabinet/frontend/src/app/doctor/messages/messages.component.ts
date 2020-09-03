import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { message } from 'src/app/message.model';
import { DoctorService } from '../doctor.service';
import { doctor } from 'src/app/doctor.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    private router: Router,
    private doctor : DoctorService,
  ) { }
  myMessages: message [];
  myDoctor: doctor;
  notFound = false;

  ngOnInit(): void {
    this.myDoctor =  JSON.parse(localStorage.getItem('doctor'));  
    this.getDoctorMessages();
  }
  getDoctorMessages() {
    this.doctor.GetDoctorMessages(this.myDoctor._id).subscribe((data: message []) => {
      this.myMessages = data;
      if (data.length == 0) {
        this.notFound;
      }
    });
  }

  AnswerPatient(f: NgForm,id_message) {
    this.doctor.DoctorAnswerPatient(f.value,id_message).subscribe(() => {
      this.getDoctorMessages();
    });
  }

  

}
