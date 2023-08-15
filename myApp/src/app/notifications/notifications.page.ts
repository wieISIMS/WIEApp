import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notificationsList: any[] = []; 
  //notificationsList: any[] = [1,2,3]; 

  constructor() { }

  ngOnInit() {
  }

}
