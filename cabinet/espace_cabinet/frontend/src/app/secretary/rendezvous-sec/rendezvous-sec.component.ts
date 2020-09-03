import { Component, OnInit } from '@angular/core';
import {SecretaryService} from '../secretary.service';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-rendezvous-sec',
  templateUrl: './rendezvous-sec.component.html',
  styleUrls: ['./rendezvous-sec.component.css']
})
export class RendezvousSecComponent implements OnInit {

  constructor(private sec : SecretaryService ) { }
  Secretary;
  myid;
  RV_id;
  HerDocId;
  searchAppoi;
  mydate ;
  ngOnInit(): void {
    this.Secretary =  JSON.parse(localStorage.getItem('secretary'));  
    this.myid = this.Secretary._id;
    this.HerDocId = this.Secretary.id_doctor._id
    this.listOwnRv(this.HerDocId);
  }
  
 
  myRV;
  listOwnRv(HerDocId){
    this.sec.ListRv(HerDocId).subscribe((data: any)=>{
      this.myRV = data
    })
  }

  message ;
  OnSubmitAccept(id ,f: NgForm){
    this.sec.AcceptRV(id,f.value).subscribe((data : any)=>{
      this.message = data
      $('#exampleModal').modal('hide');
      this.listOwnRv(this.HerDocId)
    })
  }

  danger ;
  Cancel(id){
    this.sec.CancelRV(id).subscribe((data : any)=>{
      this.danger = data
      this.listOwnRv(this.HerDocId)
    })
  }

  openModal(id, date){
    this.RV_id = id
    this.mydate = date
  }

}
