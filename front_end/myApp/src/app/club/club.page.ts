import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicesService } from '../api/services.service'; 

@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.scss'],
})
export class ClubPage implements OnInit {
  BestEventList: any;
  LatestEventList:any;
  
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private service:ServicesService
  ) {}
  currentDate:any=new Date;
  getBestEvents(){
    console.log(this.club.idC)
    this.service.getBestEvents(this.club.idC).subscribe(data=>{
    this.BestEventList=data;
    })
  }
  getClubEvents(){
    console.log(this.club.idC)
    this.service.getClubEvents(this.club.idC).subscribe(data=>{
    console.log(data);
    this.LatestEventList=data;
 
    })
  }
  isUpcomingEvent(eventDate: string): boolean {
    // Convert the 'eventDate' string to a Date object for comparison
    console.log(eventDate)
    const eventDateParts = eventDate.split('-');
    const eventDay = parseInt(eventDateParts[2], 10) ; // Convert 'YY' to 'YYYY'
    const eventMonth = parseInt(eventDateParts[1], 10); // Adjust month to be zero-based
    const eventYear = parseInt(eventDateParts[0], 10);
    console.log(eventYear, eventMonth, eventDay)
    const eventDateObj = new Date(eventYear, eventMonth, eventDay);
    console.log(eventDateObj,this.currentDate)
    // Compare 'eventDateObj' with 'currentDate'
    return eventDateObj > this.currentDate;
  }

  club:any;
  ngOnInit() {
    this.club = history.state.club;
    this.getBestEvents();
    this.getClubEvents();
  }

  goBack() {
    this.navCtrl.back(); // Cette ligne effectue le retour à la page précédente
  }
  goToEvent(group:any){
    this.router.navigate(['/event'], { state: { group: group } });
  }
}
