import { Component, OnInit } from '@angular/core';
import { SecretaryService } from '../secretary.service';

@Component({
  selector: 'app-canceled-rv',
  templateUrl: './canceled-rv.component.html',
  styleUrls: ['./canceled-rv.component.css']
})
export class CanceledRVComponent implements OnInit {

  constructor(private sec : SecretaryService ) { }
  Secretary;
  myid;
  RV_id;
  HerDocId;
  count_cancelled = 0;
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
      this.myRV.forEach(element => {
        if (element.cancel) {
          this.count_cancelled ++;
        }
      });
    })
  }
  
}
