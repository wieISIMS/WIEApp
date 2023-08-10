import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  emailPattern : string = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;'
  errormessage: string ='';
  errormessage1: string ='';
  errormailmessage: string ='';
  
  


  constructor(private router: Router) { }
   //is email valid
   isValidEmail(email: string) : boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  login(){
    
     //check email OR password
     if((this.email=='' )||(this.password=='')){
      this.errormessage = 'Please check your email or password! ';
      console.log('Please check your email or password!')
      return;
  }

     //valid email
  if (!this.isValidEmail(this.email) ) {
    console.log('Invalid email address.');
    this.errormailmessage = 'Please enter a valid email address! ';
    return;
  }
  
    //check email and password
    if(this.email=='' && this.password ==''){
      this.errormessage1='Please enter valid email and password!';
      console.log('Please enter valid email and password!');
      return; 
    }
    this.router.navigate(['/home'])
   
  }

  ngOnInit() {
  }
  
 
  
}
