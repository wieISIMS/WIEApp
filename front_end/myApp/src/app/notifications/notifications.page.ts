import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../api/services.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notificationsList: any; 

  constructor(private router: Router,
    private service:ServicesService) { }

  ngOnInit() {
    this.getAllNotif();
  }
  goToEvent(group:any){
    this.router.navigate(['/event'], { state: { group: group } });
  }
  getAllNotif(){
    this.service.getAllNotif(localStorage.getItem('token')).subscribe(data=>{
      this.notificationsList=data
      console.log(this.notificationsList.title);
    })
  }
}