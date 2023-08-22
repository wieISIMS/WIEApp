import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

interface event {
  idEvent:any;
  image: any;
  club:any;
  title:any;
  date:any;
} 
@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.scss'],
})
export class ClubPage implements OnInit {
  BestEventList: event[] = [
    {
    idEvent:1,
    image: '../../assets/cleaning_day.jpg',
    club: 'Microsoft ISIMS',
    title:'Picnic Touta Garden',
    date: '20/07/23',
  },
  {
    idEvent:2,
    image: '../../assets/Picnic.jpg',
    club: 'Microsoft ISIMS',
    title:'Cleaning day',
    date: '25/09/23',},
    {
      idEvent:1,
      image: '../../assets/cleaning_day.jpg',
      club: 'Microsoft ISIMS',
      title:'Picnic Touta Garden',
      date: '20/07/23',
    },
  ]; 

  LatestEventList: event[] = [
    {
    idEvent:1,
    image: '../../assets/cleaning_day.jpg',
    club: 'Microsoft ISIMS',
    title:'Cleaning day',
    date: '25/09/23',},

  {
    idEvent:2,
    image: 'assets/microsoft.jpg',
    club: 'Microsoft ISIMS',

    title:'New event',
    date: '2 hours ago',}
  ]; 
  
  constructor(
    private navCtrl: NavController,
    private router: Router
  ) {}
  currentDate: Date = new Date(); // Get the current date

  isUpcomingEvent(eventDate: string): boolean {
    // Convert the 'eventDate' string to a Date object for comparison
    const eventDateParts = eventDate.split('/');
    const eventYear = parseInt(eventDateParts[2], 10) + 2000; // Convert 'YY' to 'YYYY'
    const eventMonth = parseInt(eventDateParts[1], 10) - 1; // Adjust month to be zero-based
    const eventDay = parseInt(eventDateParts[0], 10);
    const eventDateObj = new Date(eventYear, eventMonth, eventDay);

    // Compare 'eventDateObj' with 'currentDate'
    return eventDateObj > this.currentDate;
  }

  club:any;
  ngOnInit() {
    this.club = history.state.club;
  }

  goBack() {
    this.navCtrl.back(); // Cette ligne effectue le retour à la page précédente
  }
  goToEvent(group:any){
    this.router.navigate(['/event'], { state: { group: group } });
  }
}
