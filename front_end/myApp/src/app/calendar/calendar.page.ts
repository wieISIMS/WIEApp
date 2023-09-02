import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  events: {
    nom: string;
    startTime: string;
    endTime: string;
    trainer: string;
    place: string;
    nom_du_club: string;
    photo_du_club:any;
    dateEvent: Date;
  }[] = [];
  //events: string[] = [];
  weekdays: { name: string; date: Date }[] = [];

  constructor() {
    this.initializeWeekdays();
  }

  ngOnInit() {
    //this.getEventsForDay({ name: this.currentDate.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0), date: this.currentDate });
    this.selectedDate = new Date(); // Set the selectedDate to the current date
    this.getEventsForDay({ name: '', date: this.selectedDate }); // Load events for the current date
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




  getEventsForDay(day: { name: string; date: Date }) {
    // Mocking events for demonstration purposes.
    this.events = [
      {
        nom: 'Flutter training session',
        startTime: '10:00',
        endTime: '11:30',
        trainer: 'Mr.Mohammed Bouaziz',
        place: 'Salle2-ISIMS',
        nom_du_club:'IEEE WIE Affinity group ISIMS',
        photo_du_club:"../../assets/Wie.jpg",
        dateEvent: day.date,
      },
      {
        nom: 'Info session',
        startTime: '14:00',
        endTime: '16:00',
        trainer: 'Wie Act',
        place: 'Online',
        nom_du_club:'IEEE WIE Affinity group ISIMS',
        photo_du_club:"../../assets/Wie.jpg",
        dateEvent: day.date,
      },
      {
        nom: 'Integration day',
        startTime: '17:00',
        endTime: '20:00',
        trainer: 'Stand',
        place: 'ISIMS',
        nom_du_club:'IEEE RAS ISIMS',
        photo_du_club:"../../assets/Ras.jpg",
        dateEvent: day.date,
      },
    ];
    this.selectedDate = day.date;
  }

}