import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../api/services.service'; 


@Component ({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username='';
  img ='';
  title = Object
  clubs: any[] = []; 
  LastEvents: any[] = []; 
  LatestNews: any[] = [];
  cardsSearched: any[] = [];
  cardsOn=false;
  searchEvent(title:any){
    this.service.searchEvent(title).subscribe(data=>{
      this.cardsSearched=data;
      this.cardsOn= true;
      if(title==''){
        this.cardsOn=false;
      }
    })
  }
  ionChange(event:any) {
    this.cardsSearched=[];
    this.searchEvent(event.detail.value)

}
  hideSearch() {
   this.cardsOn=false;
   this.searchEvent('')
  }
  getOurClub(){
    this.service.getOurClub().subscribe(data=>{
      this.clubs = data;
   
    })
  }
  getLastEvent(){
    this.service.getLastEvent().subscribe(data=>{
      this.LastEvents = data;
    })
  }
  getLatestNews(){
    this.service.getLatestNews().subscribe(data=>{
      this.LatestNews = data;
    })
  }
  getMemberInfo(){
    this.service.getMemberInfo(localStorage.getItem('token')).subscribe(data=>{
      this.username=data.firstName;
      this.img="http://127.0.0.1:8000"+data.photo;
      console.log(data);
    })
  }



  constructor(private router: Router,private service:ServicesService) {}

  profile() {
    this.router.navigate(['/activities']);
  }
  goToEvent(group:any){
    this.router.navigate(['/event'], { state: { group: group } });
  }
  goToClub(group:any){
    this.router.navigate(['/club'], { state: { club: group } });
  }
  ngOnInit(): void {
    this.getMemberInfo()
    this.getOurClub()
    this.getLastEvent()
    this.getLatestNews()
  }

}