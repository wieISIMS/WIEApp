import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string = '';

  emailPattern : string = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;'
  errormessagemail: string ='';

  constructor(    private navCtrl: NavController,
    ) { 
    
  }
  goBack() {
    this.navCtrl.back(); // Cette ligne effectue le retour à la page précédente
  }
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