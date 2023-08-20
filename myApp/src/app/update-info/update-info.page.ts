import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.page.html',
  styleUrls: ['./update-info.page.scss'],
})
export class UpdateInfoPage implements OnInit {
  errormessage: string ='';
  password: string = '';
  confirmPassword: string = '';
  phoneNumber: string = '';
  constructor(    
    private navCtrl: NavController,
    private alertController: AlertController) { }


  async onUpdateInfoClick() {
    const alert = await this.alertController.create({
      header: 'Update Info',
      message: 'Your information has been updated.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }
  goBack() {
    this.navCtrl.back(); // Cette ligne effectue le retour à la page précédente
  }
  changePic(){
    
  }
}
