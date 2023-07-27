import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.page.html',
  styleUrls: ['./update-info.page.scss'],
})
export class UpdateInfoPage implements OnInit {

  constructor(private alertController: AlertController) { }
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

}
