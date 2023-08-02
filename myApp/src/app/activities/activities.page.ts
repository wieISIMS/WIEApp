import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {
  showEventsPage: boolean = true;
  showClubsPage: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  showEvents() {
    this.showEventsPage = true;
    this.showClubsPage = false;
  }

  showClubs() {
    this.showEventsPage = false;
    this.showClubsPage = true;
  }


}
