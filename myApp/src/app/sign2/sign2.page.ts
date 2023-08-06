import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;

@Component({
  selector: 'app-sign2',
  templateUrl: './sign2.page.html',
  styleUrls: ['./sign2.page.scss'],
})
export class Sign2Page implements OnInit {
  phoneNumber: string='';
  userName: string='';
  errormessage: string ='';
  

  constructor(private router: Router) {}

  isValidPhoneNumber(phoneNumber: string): boolean {
    const phonePattern = /^[1-9]\d{1}[0-9]\d{1}[0-9]\d{4}$/;
    return phonePattern.test(phoneNumber);
  }

  isValidUsername(userName: string): boolean {
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    return usernamePattern.test(userName);
  }
  
  confirm(){
   if (!this.isValidPhoneNumber(this.phoneNumber)) {
      console.log('Invalid phone number.');
      //this.errormessage='Invalid phone number.';
      return;
    }
    

     // Validate username
     if (!this.isValidUsername(this.userName)) {
      console.log('Invalid username.');
      return;
    }
    
    //phone number and username are valid, go to login
    this.router.navigate(['/login']);
  }
  showError(): string{
    if(!this.phoneNumber){
      return "Phone number is required!";
    }
    else if(!this.userName){
      return "User name is required!";
    }
    else if(this.phoneNumber && !this.isValidPhoneNumber(this.phoneNumber)){
      return "Invalid phone number!";
    }
    else if(this.userName && !this.isValidUsername(this.userName)){
      return "Invalid username!";
    }    
    return ' ';
  }
  

  ngOnInit() {
  }
  
}


