import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablinks',
  templateUrl: './tablinks.page.html',
  styleUrls: ['./tablinks.page.scss'],
})
export class TablinksPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  currentActiveTab: string = 'home';
  isActive(tab: string): boolean {
    return this.currentActiveTab === tab;
  }

  // Method to handle tab button click
  onTabClicked(tab: string): void {
    this.currentActiveTab = tab;
  }
}


