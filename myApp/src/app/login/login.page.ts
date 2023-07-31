import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', '../app.component.scss'],
})
export class LoginPage {
  emailmsg!: string;
  passwordmsg!: string;

  @ViewChild('emailInput', { static: false }) emailInput!: ElementRef;
  @ViewChild('passwordInput', { static: false }) passwordInput!: ElementRef;

  passwordVisible = false;

  constructor(private router: Router) {}

  login() {
    const emailValue = this.emailInput.nativeElement.value;
    const passwordValue = this.passwordInput.nativeElement.value;
    console.log(emailValue);
    this.emailmsg = '';
    this.passwordmsg = '';

    // Email validation
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    if (!emailPattern.test(emailValue) || emailValue === '') {
      this.emailmsg = 'Please provide a properly formatted email address';
    }

    if (passwordValue === '') {
      this.passwordmsg = 'Please provide a password';
    }

    //if (passwordValue !== 'password') {this.passwordmsg = 'Please provide a password';}
    else{
    //login logic
    this.router.navigate(['/tablinks']);
}
}

togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}

}
