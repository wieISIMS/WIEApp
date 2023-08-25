import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {
  email!: string ;
  password!: string;
  confirmPassword!: string;

  errorpassmessage1!: string;
  errorpassmessage2!: string;
  errormailmessage!: string;


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
    if (!this.email ) {
      this.errormailmessage = 'Email address is required.';
    }
    else{ if (!this.isValidEmail(this.email) ) {
      this.errormailmessage = 'Please enter a valid email address! ';
    }}

    if(!this.password&& !this.confirmPassword){
      this.errorpassmessage1 = 'Password is required.';
      this.errorpassmessage2 = 'Password is required.';
      return
    }
    else{
        if (!this.password) {
          this.errorpassmessage1 = 'Password is required.';
        }
        else{
          // Validate password length
          const minLength = 6;
          if (this.password.length < minLength) {
            this.errorpassmessage1 = 'Your password is too weak!';
          }
        }
        if (!this.confirmPassword) {
          this.errorpassmessage2 = 'Confirm Password is required.';
          return
        }
        else{
          //check password kifkif
          if (this.password !== this.confirmPassword) {
            this.errorpassmessage2 = 'Passwords do not match!';
            return;
        }
        }
      }
      if (this.isValidEmail(this.email)) {
        this.router.navigate(['/sign2'], { state: { mail:this.email ,password:this.password } })
      }
  }


  clearErrorMessage(errorVariable: string) {
    if (errorVariable === 'errormailmessage') {
      this.errormailmessage = '';
    } else if (errorVariable === 'errorpassmessage1') {
      this.errorpassmessage1 = '';
    }
    else if (errorVariable === 'errorpassmessage2') {
      this.errorpassmessage2 = '';
    }
  }

}

