import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface notif {
  idEvent:any;
  image: any;
  club:any;
  title:any;
  time:any
} 

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  //notificationsList: notif[] = []; 
  notificationsList: notif[] = [
    {
      idEvent:1,
    image: 'assets/img/wie.png',
    club: 'IEEE WIE Affinity Group',
    title:'New event',
    time: '45 minutes ago',
  },
  {
    idEvent:2,
    image: 'assets/microsoft.jpg',
    club: 'Microsoft ISIMS',
    title:'New event',
    time: '2 hours ago',}
  ]; 
  
  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToEvent(group:any){
    this.router.navigate(['/event'], { state: { group: group } });
  }
}
