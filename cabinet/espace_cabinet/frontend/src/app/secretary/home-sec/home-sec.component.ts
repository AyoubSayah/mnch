import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {SecretaryService} from '../secretary.service';
declare var $: any;

@Component({
  selector: 'app-home-sec',
  templateUrl: './home-sec.component.html',
  styleUrls: ['./home-sec.component.css']
})
export class HomeSecComponent implements OnInit {

  constructor(private sec : SecretaryService) { }
  Secretary;
  myid;
  alert;
  ngOnInit(): void {
    this.Secretary =  JSON.parse(localStorage.getItem('secretary')); 
    this.myid = this.Secretary._id; 
  }

  
  updateProfile(myid , f: NgForm ){
    if (f.value.newPassword != '') {
      f.value.password = f.value.newPassword;
    }
    delete f.value.newPassword;
    if (f.value.password != '') {
      this.sec.UpdateSec(myid, f.value).subscribe((data : any)=>{
        localStorage.setItem('secretary', JSON.stringify(data));
        $('#updateSec').modal('hide');
        window.location.reload()
      })
    }else{
      this.alert = 'Veuiller écrire votre ancien mot de passe pour effectuer le changement';
    }
    
  }
}
