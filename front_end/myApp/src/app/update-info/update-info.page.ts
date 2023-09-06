import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../api/services.service'; 

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.page.html',
  styleUrls: ['./update-info.page.scss'],
})
export class UpdateInfoPage implements OnInit {
  errormessageemail: string ='';
  errormessagephone: string ='';
  errormessagepassword: string ='';
  img:any;
  email!: string ;
  phoneNumber!: string ;
  password!: string;
  confirmPassword!: string;
  constructor(    
    private navCtrl: NavController,
    private service:ServicesService,
    private alertController: AlertController) { }

    getMemberInfo(){
      this.service.getMemberInfo(localStorage.getItem('token')).subscribe(data=>{
        console.log(data)
        this.email=data.email;
        this.phoneNumber=data.number;
        console.log(this.phoneNumber);
        this.password=data.password;
        this.img="http://127.0.0.1:8000"+data.photo;
      })
    }

    async updateProfile() {
      this.service.getMemberInfo(localStorage.getItem('token')).subscribe(async data=>{
      const inputFieldsNotEmpty = this.checkInputFieldsNotEmpty(); // Fonction pour vérifier les champs non vides
      
      if (inputFieldsNotEmpty) {
        const alert = await this.alertController.create({
          header: 'Update Info',
          message: 'Your information has been updated.',
          buttons: ['OK']
        });
    
        await alert.present();
      }
    })
  }
    
    isValidEmail(email: string) : boolean {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    }
    isValidPhoneNumber(phoneNumber: string): boolean {
      const phonePattern = /^\[1-9]\d{7}$/;
      return phonePattern.test(phoneNumber);
    }
    
    checkInputFieldsNotEmpty() {
      this.errormessageemail ='';
      this.errormessagephone='';
      this.errormessagepassword ='';
      let test: boolean = true;

      if (!this.email || !this.isValidEmail(this.email)){
        this.errormessageemail="Please enter a valid email address!";
        test=false;
      }
      if (this.phoneNumber=="" || !this.isValidPhoneNumber(this.phoneNumber)){
        console.log(this.phoneNumber)
        this.errormessagephone="Please enter a valid phone number!";
        test=false;
      }
      if (this.password!==this.confirmPassword){
        this.errormessagepassword=" Passwords do not match!";
        test=false;
       
      }
      return test;
    }
    

  ngOnInit() {
    this.getMemberInfo();
  }
  goBack() {
    this.navCtrl.back(); // Cette ligne effectue le retour à la page précédente
  }
  changePic(){
   
  }
}