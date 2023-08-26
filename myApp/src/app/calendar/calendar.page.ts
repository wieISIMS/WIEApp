import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  events: string[] = [];
  weekdays: { name: string; date: Date }[] = [];

  constructor() {
    this.initializeWeekdays();
  }

  ngOnInit() {
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
      `Event 1 on ${day.date.toDateString()}`,
      `Event 2 on ${day.date.toDateString()}`,
      `Event 3 on ${day.date.toDateString()}`,
    ];
    this.selectedDate = day.date;
  }

}
