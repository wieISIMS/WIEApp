import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {
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

  openSettings() {
    // Code pour ouvrir les paramètres
  }

  signOut() {
    // Code pour déconnecter l'utilisateur
  }
}

