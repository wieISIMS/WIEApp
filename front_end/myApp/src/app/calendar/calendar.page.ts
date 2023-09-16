import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../api/services.service'; 

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  idMember:any;
  events:any;
  //events: string[] = [];
  weekdays: { name: string; date: Date }[] = [];
  extendedWeekdays: { name: string; date: Date }[] = [];
  constructor(
    private router: Router,
    private service:ServicesService
  ) {
    this.initializeWeekdays();
    
  }

  ngOnInit() {
    //this.getEventsForDay({ name: this.currentDate.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0), date: this.currentDate });
    this.selectedDate = new Date(); // Set the selectedDate to the current date
    this.getCalender({ name: '', date: this.selectedDate }); // Load events for the current date
    this.idMember=localStorage.getItem('token');
  }
  private initializeWeekdays() {
    const today = new Date(this.currentDate);
    const dayOfWeek = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);
  
    this.extendedWeekdays = [];
  
    // Calculate dates for the current week
    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
      this.extendedWeekdays.push({ name: dayName, date: date });
    }
  
    // Calculate dates for one week later than the current week
    for (let i = 7; i < 14; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
      this.extendedWeekdays.push({ name: dayName, date: date });
    }
  }
  goToEvent(group:any){
    this.router.navigate(['/event'], { state: { group: group } });
    console.log(group)
  }

  getCalender(day: { name: string; date: Date }){
    // Formate la date au format 'YYYY-MM-DD'
    const formattedDate = day.date.toISOString().split('T')[0];
    console.log(formattedDate);
    this.service.getCalender(this.idMember,formattedDate).subscribe(data=>{
    if (Array.isArray(data) && data.length !== 0) {
      this.events=data;
    }
    else{
      this.events=[];
    }
    console.log(data);
    this.selectedDate = day.date;
})
}
}