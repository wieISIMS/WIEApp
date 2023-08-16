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
  errormessagename: string ='';

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
    if (this.userName==''){
      this.errormessagename = 'Please enter a valid user name! ';
    }
    else  if (!this.isValidUsername(this.userName)) {
      console.log('Invalid username.');
      this.errormessagename = 'Invalid username ';
      return;
    }
    if (this.phoneNumber==''){
      this.errormessage = 'Please enter a valid phone number! ';
    }
    else if (!this.isValidPhoneNumber(this.phoneNumber)) {
      console.log('Invalid phone number.');
      this.errormessage='Invalid phone number.';
      return;
    }
         
    if(this.errormessagename==this.errormessage){
      this.router.navigate(['/tablinks'])
    }
    
    
  }
  
  

  ngOnInit() {
  }
  
}


