import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '' ;
 
  errormessage: string ='';
  errorpassmessage: string ='';
  errormailmessage: string ='';
  errormatchmessage: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }
   //is email valid
  isValidEmail(email: string) : boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  sign(){

    //check email AND password
  if(this.email=='' && this.password=='' && this.confirmPassword==''){
    this.errormessage = 'Please check your email or password! ';
    console.log('Please check your email or password!')
    return;
  }
  
  //valid email
  if (!this.isValidEmail(this.email)) {
    console.log('Invalid email address.');
    this.errormailmessage = 'Please enter a valid email adress! ';
    return;
  }

    // Validate password length
    const minLength = 8;
    if (this.password.length < minLength) {
      console.log(`Password must be at least ${minLength} characters.`);
      this.errorpassmessage = 'Your password is too weak!';
      return;
    }

  //check email OR password
  if(this.email=='' || this.password==''){
    this.errormessage = 'Please check your email or password! ';
    console.log('Please check your email or password!')
    return;
  }

   //check password kifkif
  if (this.password !== this.confirmPassword) {
    console.log('Passwords do not match.');
    this.errormatchmessage = 'Passwords do not match!';
    return;
}
 
  
this.router.navigate(['/sign2'])

  }

}

