import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string = '';

  emailPattern : string = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;'
  errormessagemail: string ='';

  constructor() { }
  isValidEmail(email: string) : boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  ngOnInit() {
  }
  SendLink(){
  if (this.email === '') {
    this.errormessagemail = 'Email address is required.';
  }
}
clearErrorMessage(errorVariable: string) {
  if (errorVariable === 'errormessagemail') {
    this.errormessagemail = '';
  }
}
}