import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { ServicesService } from '../api/services.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  emailPattern : string = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;'
  errormessagemail: string ='';
  errormessagePass: string ='';
  
  


  constructor(private router: Router, private service:ServicesService) { }
  
   //is email valid
   isValidEmail(email: string) : boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  login(){
    
     //check email OR password
     
    if (this.email === '') {
      this.errormessagemail = 'Email address is required.';
    }
    if (this.password === '') {
      this.errormessagePass = 'Password is required.';
    }

    else{
    this.service.login(this.email,this.password).subscribe(data=>{
      if (data.message=="member not found"){
        this.errormessagemail = 'Password or username not correct';
        this.errormessagePass = 'Password or username not correct';
      }
      else{
        localStorage.setItem('token',data.id)
        this.router.navigate(['/tablinks'])
      }
    })
   
  }
  }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigate(['/tablinks'])
    }
  }
  clearErrorMessage(errorVariable: string) {
    if (errorVariable === 'errormessagemail') {
      this.errormessagemail = '';
    } else if (errorVariable === 'errormessagePass') {
      this.errormessagePass = '';
    }
  }
}
