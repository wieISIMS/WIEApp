import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../api/services.service'; 
interface CardEvent {
  idEvent:any;
  image: any;
  club:any;
  title:any;
  desc:any;
} 

interface CardClub {
  idC: any;
  nameC:any;
  logo:any;
  nbMembers:any;
  nbEvents:any;
}

@Component ({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username='';
  img ='';
  getMemberInfo(){
    
    this.service.getMemberInfo(localStorage.getItem('token')).subscribe(data=>{
      this.username=data.firstName;
      this.img="http://127.0.0.1:8000"+data.photo;
      console.log(data);
    })
  }
  LastEvents: CardEvent[] = [
    {
    idEvent:1,
    image: '../../assets/Ras.jpg',
    club: 'IEEE ISIMS SB',
    title:'TSYP X',
    desc:'10Th IEEE Tunisian Students and Young Professionals TSYP Congress organized by IEEE Esprit Student Branch.',
  },
  {
    idEvent:2,
    image: '../../assets/ias-tam.jpg',
    club: 'Microsoft ISIMS',
    title:'IAS TAM 3.0',
    desc:'IEEE Industry Applications Society Tunisia Annual Meeting organized by IEEE ENETCOM Student Branch.',
    }
  ]; 

  club: CardClub[] = [
    {
      idC: 1,
      nameC:'IEEE WIE AF',
      logo:'../../assets/Wie.jpg',
      nbMembers:110,
      nbEvents:10
    },
  {
      idC: 2,
      nameC:'Microsoft Tech Club',
      logo:'../../assets/microsoft.jpg',
      nbMembers:200,
      nbEvents:55

  }
  ]; 
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
  }

}
