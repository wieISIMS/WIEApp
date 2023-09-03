import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../api/services.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})

export class ActivitiesPage implements OnInit {
  club:any;
  name='';
  fname='';
  img ='';
  idm:any;
  events:any;
  showEventsPage: boolean = true;
  showClubsPage: boolean = false;
  isSettingsMenuOpen = false;

    
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private service:ServicesService
  ) {}
  goBack() {
    this.navCtrl.back(); // Cette ligne effectue le retour à la page précédente
  }

    update() {
      this.router.navigate(['/update-info']);
    
   }

  ngOnInit() {
    this.getMemberInfo();
    this.idm = localStorage.getItem('token')
    this.showEvents();
    console.log(this.idm)
  }
  getMemberInfo(){
    this.service.getMemberInfo(localStorage.getItem('token')).subscribe(data=>{
      this.name=data.firstName;
      this.fname=data.familyName;
      this.img="http://127.0.0.1:8000"+data.photo;
      console.log(data);
    })
  }
  showEvents() {
    this.service.getMemberEvents(this.idm).subscribe(data=>{
    this.showEventsPage = true;
    this.showClubsPage = false;
    console.log(data);
    this.events=data;
    })
  }

  showClubs() {
    this.service.getMemberClubs(this.idm).subscribe(data=>{
    this.showEventsPage = false;
    this.showClubsPage = true;
    console.log(data);
    this.club=data;
    if (data.message==""){

    }
    })
  }

  toggleSettingsMenu() {
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
  }

  goToEvent(group:any){
    this.router.navigate(['/event'], { state: { group: group } });
  }
  goToClub(group:any){
    this.router.navigate(['/club'], { state: { club: group } });
  }

  openSettings() {
    // Code pour ouvrir les paramètres
  }

  signOut() {
    // Code pour déconnecter l'utilisateur
  }
}

