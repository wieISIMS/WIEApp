import { Component, OnInit } from '@angular/core';
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


    constructor(private router: Router) {}

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

