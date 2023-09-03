import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../api/services.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  group:any;
  ide:any;
  idm:any;
  full:any;
  eventPart:boolean=false;
  eventFinished:boolean=false;
  participateEvent(){
  
   this.service.participateEvent(this.group.id,this.idm).subscribe(data=>{
   window.location.reload();
   this.eventPart = true;
   })
 }
 finishedEvent(){
    this.service.finishedEvent(this.group.id).subscribe(data=>{
      if(data.message=="True"){
        this.eventFinished = true;
      }
      
    })
  }
 verifParticipate(){
  
  this.service.verifParticipate(this.group.id,this.idm).subscribe(data=>{
  console.log(data)
  console.log(this.group.id,this.idm)
  if(data.message=="True"){
    this.eventPart = true;
  }
  this.full=data.complete
  })
}
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private service:ServicesService
  ) {}
  ngOnInit() {
    this.group = history.state.group;
    this.idm = localStorage.getItem('token')
    this.verifParticipate();
    this.finishedEvent();
  }
  goBack() {
    this.navCtrl.back(); // Cette ligne effectue le retour à la page précédente
  }
}
