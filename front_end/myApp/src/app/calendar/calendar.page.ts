import { Component, OnInit } from '@angular/core';
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

  constructor(
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
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
      this.weekdays.push({ name: dayName, date: date });
    }
  }


  getCalender(day: { name: string; date: Date }){
    console.log(day.date)
    this.service.getCalender(day.date,this.idMember).subscribe(data=>{
    this.events=data;
    this.selectedDate = day.date;
    console.log(data);
})
}

}