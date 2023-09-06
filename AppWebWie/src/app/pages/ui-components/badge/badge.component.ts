import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html'
})
export class AppBadgeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      // Vous pouvez ici traiter le fichier comme vous le souhaitez, par exemple, l'envoyer à un serveur.
      console.log(`Fichier sélectionné: ${file.name}`);
    }
  }
  
}
