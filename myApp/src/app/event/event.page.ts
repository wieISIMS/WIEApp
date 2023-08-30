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
  clubName=''
  clubPhoto=''
  title=''
  description=''
  photo=''
  dateEvent=''
  finished=false
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private service:ServicesService
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.getEventDetail(params['id']).subscribe(data=>{
        this.clubName=data.clubName
        this.clubPhoto="http://127.0.0.1:8000"+data.clubPhoto
        this.title=data.title
        this.description=data.description
        this.photo="http://127.0.0.1:8000"+data.photo
        this.dateEvent=data.dateEvent
        this.finished=data.finished
      })
    });
  }
  goBack() {
    this.navCtrl.back(); 
  }
}
