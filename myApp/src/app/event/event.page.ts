import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  group:any;
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.group = history.state.group;
    console.log(this.group)
  }
  goBack() {
    this.navCtrl.back(); // Cette ligne effectue le retour à la page précédente
  }
}
