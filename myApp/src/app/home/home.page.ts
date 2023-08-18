import { Component } from '@angular/core';
import { Router } from '@angular/router';
interface CardEvent {
  idE: any;
  name:any;
  desc:any
}

interface CardClub {
  idC: any;
  nameC:any;
  nbMembers:any
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  profile() {
    this.router.navigate(['/activities']);
  }


}
