import { Component, OnInit ,ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {

  signUpForm!: FormGroup;
  emailmsg!: string;
  passwordmsg!:string;
  errorMessage!:string;
  confpasswordmsg!:string;
  test!:boolean;
   constructor(private router: Router ) {}
   @ViewChild('emailInput') emailInput!: ElementRef;
   @ViewChild('passwordInput') passwordInput!: ElementRef;
   @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;
   
   
   ngOnInit() {
     
   }
 
   onSign()  {
     const emailValue = this.emailInput.nativeElement.value; 
     const passwordValue = this.passwordInput.nativeElement.value; 
     const confirmPasswordValue = this.confirmPasswordInput.nativeElement.value; 
     this.emailmsg='';
     this.passwordmsg='';
     this.confpasswordmsg='';
     this.errorMessage='';
 
       // Check if email is in the correct format
       const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
       //email & password empty
       if (emailValue=='' &&  passwordValue==''&& confirmPasswordValue ==''){
         this.emailmsg = 'Please provide a properly formatted email adress';
         this.passwordmsg="Please provide a password";
         this.confpasswordmsg="Please provide a password";
         return ;
       }
       //email empty
       if (emailValue=='' &&  passwordValue==confirmPasswordValue){
         this.emailmsg = 'Please provide a properly formatted email adress';
         return ;
       }
       //password empty
       if (emailValue=='' &&  passwordValue!=''&& confirmPasswordValue ==''){
         this.emailmsg = 'Please provide a properly formatted email adress';
         this.confpasswordmsg="Please provide a password";
         console.log("password mch maktoub");
         return ;
       }
 
       if (emailValue=='' &&  passwordValue==''&& confirmPasswordValue !=''){
         this.emailmsg = 'Please provide a properly formatted email adress';
         this.passwordmsg="Please provide a password";
         return ;
       }
 
       //password needed
       if (emailValue!='' &&  (passwordValue=='' || confirmPasswordValue =='')){
         this.confpasswordmsg = 'Please provide a properly formatted email adress';
         this.passwordmsg="Please provide a password";
         return ;
       }
       //email invalid
       if (!emailPattern.test(emailValue)) {
         this.emailmsg = 'Please provide a properly formatted email adress';
         if (passwordValue !== confirmPasswordValue) {
           this.passwordmsg = 'Password and confirm password do not match';
           this.confpasswordmsg="Password and confirm password do not match";
           return ;}
         
       }
 
       // Check if password and confirm password match
       if (passwordValue !== confirmPasswordValue) {
         this.passwordmsg = 'Password and confirm password do not match';
         this.confpasswordmsg="Password and confirm password do not match"
         return ;
       }
       //signup logic
       this.router.navigate(['/sign2']);
           //this.emailmsg = 'this email already exists';

         
       }      
   }