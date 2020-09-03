import { Component, OnInit } from '@angular/core';
import { consultation } from 'src/app/consultation.model';
import { DoctorService } from '../doctor.service';
import { doctor } from 'src/app/doctor.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {

  constructor(private doctor:DoctorService,private formBuilder: FormBuilder) { }

  myDoctor: doctor;
  myConsultations: consultation [];
  id_doctor;
  id_const;
  myFile :any;
  uploadForm: FormGroup; 
  formData = new FormData();

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    }); 
    this.myDoctor =  JSON.parse(localStorage.getItem('doctor'));  
    this.id_doctor = this.myDoctor._id;
    this.loadAllConsultations();
  }

  

  //Get consultations ( not archived )
  loadAllConsultations() {
    this.doctor.getAllConsultations(this.id_doctor).subscribe((data: consultation []) => {
      this.myConsultations = data;
    });
  }

  // Archive consultation 
  archive(id_consultation) {
    this.doctor.archiveConsultation(id_consultation).subscribe(() => {
      this.loadAllConsultations();
    });
  }
  // Get consultation Id 
  getConstId(id_cons) {
    this.id_const = id_cons;
  }

  onFileSelected(event) {
    
    this.myFile = event.target.files[0];
    console.log(this.myFile);
    
    this.uploadForm.get('file').setValue(this.myFile);
  }
  onSubmit(id_const) {
    
    this.formData.append('file', this.uploadForm.get('file').value);
    this.doctor.AddfileConsultation(this.formData,id_const).subscribe(() => {
      this.loadAllConsultations();
      $('#Addfile').modal('hide');
      this.uploadForm.reset()
      this.formData.delete('file')
    });
  }
delete(idcons,idfile){
  Swal.fire({
    title: 'Vous êtes sur?',
    text: "Vous ne pouvez plus le récuperer!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Annuler',
    confirmButtonText: 'Oui, Supprimer!'
  }).then((result) => {
    if (result.value) {
      this.doctor.deletefile(idcons,idfile).subscribe(()=>{
        this.doctor.getAllConsultations(this.id_doctor).subscribe((data: consultation []) => {
              this.myConsultations = data;
              Swal.fire(
                'Fichier Supprimé!',
                'votre fichier a été supprimé.',
                'success'
              )
            });  })
      
    }
  })
  console.log(idcons,idfile);
  
 
}
}
