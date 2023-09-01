import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notificationsList: any[] = []; 
  /*notificationsList: any[] = [
    {
      club: 'IEEE WIE Affinity Group',
      image: 'assets/Wie.jpg',
      notification: {
        idEvent: 1,
        title: 'New event',
        time: '45 minutes ago'
      }
  },
  {
    club: 'Microsoft ISIMS',
    image: 'assets/microsoft.jpg',
    notification: {
      idEvent: 2,
      title: 'New event',
      time: '2 hours ago'
    }
    }
  ]; */
  
  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToEvent(group:any){
    this.router.navigate(['/event'], { state: { group: group } });
  }
}