import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
interface CardEvent {
  idEvent:any;
  image: any;
  club:any;
  title:any;
  desc:any;
} 

interface CardClub {
  idC: any;
  nameC:any;
  logo:any;
  nbMembers:any;
  nbEvents:any;
}
@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})

export class ActivitiesPage implements OnInit {

  events: CardEvent[] = [
    {
    idEvent:1,
    image: '../../assets/Ras.jpg',
    club: 'IEEE ISIMS SB',
    title:'TSYP X',
    desc:'10Th IEEE Tunisian Students and Young Professionals TSYP Congress organized by IEEE Esprit Student Branch.',
  },
  {
    idEvent:2,
    image: '../../assets/ias-tam.jpg',
    club: 'Microsoft ISIMS',
    title:'IAS TAM 3.0',
    desc:'IEEE Industry Applications Society Tunisia Annual Meeting organized by IEEE ENETCOM Student Branch.',
    }
  ]; 

  club: CardClub[] = []

 /* club: CardClub[] = [
    {
      idC: 1,
      nameC:'IEEE WIE AF',
      logo:'../../assets/Wie.jpg',
      nbMembers:110,
      nbEvents:10
    },
  {
      idC: 2,
      nameC:'Microsoft Tech Club',
      logo:'../../assets/microsoft.jpg',
      nbMembers:200,
      nbEvents:55

  }
  ]; */

  showEventsPage: boolean = true;
  showClubsPage: boolean = false;
  isSettingsMenuOpen = false;

    
  constructor(
    private navCtrl: NavController,
    private router: Router
  ) {}
  goBack() {
    this.navCtrl.back(); // Cette ligne effectue le retour à la page précédente
  }

    update() {
      this.router.navigate(['/update-info']);
    
   }

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

