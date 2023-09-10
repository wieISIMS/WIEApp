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
  new_email:any;
  new_pwd:any;
  new_phoneNumber:any;
  new_photo:any;
  constructor(    
    private navCtrl: NavController,
    private service:ServicesService,
    private alertController: AlertController) { }

    getMemberInfo(){
      this.service.getMemberInfo(localStorage.getItem('token')).subscribe(data=>{
        console.log(data)
        this.email=data.email;
        this.phoneNumber=data.phoneNumber;
        this.password=data.password;
        this.img="http://127.0.0.1:8000"+data.photo;
      })
    }


    toDataURL(url:any, callback:any) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }



    updateEmail(email:any){
      this.new_email = email.detail.value
    }
    updatePwd(password:any){
      this.new_pwd = password.detail.value
    }
    updatePhone(phoneNumber:any){
      this.new_phoneNumber= phoneNumber.detail.value
    }
    updatePhoto(event:any){
      
      this.new_photo = event.target.files[0]
      let reader=new FileReader()
      reader.readAsDataURL(this.new_photo)
      reader.onload=(event)=>{
        this.new_photo=event.target!.result
      }
      console.log(this.new_photo)
    }

    
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
  
      if (file) {
        // Traitez le fichier sélectionné, par exemple :
        // - Téléchargez le fichier
        // - Affichez un aperçu de l'image
        // - Faites autre chose en fonction de vos besoins
      }
    }
    openFileSelector() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*'; // Accepte uniquement les fichiers d'image
      input.addEventListener('change', this.onFileSelected.bind(this));
      input.click();
    }
    updateProfile() {
      if(this.new_email==undefined){
        this.new_email=this.email;
      }
      if(this.new_pwd==undefined){
        this.new_pwd=this.password;
      }
      if(this.new_phoneNumber==undefined){
        this.new_phoneNumber=this.phoneNumber;
      }
      if(this.new_photo==undefined){
        this.new_photo=this.img;
      }
      console.log(this.new_email,this .new_pwd,this.new_photo,this.new_phoneNumber); 
      this.toDataURL(this.new_photo, (dataUrl: any) => {
      this.new_photo = dataUrl;
      this.service.updateProfile(localStorage.getItem('token'),this.new_email,this.new_pwd,this.new_photo,this.new_phoneNumber).subscribe(async data=>{
        const inputFieldsNotEmpty = this.checkInputFieldsNotEmpty(); // Fonction pour vérifier les champs non vides
        this.getMemberInfo();
        if (inputFieldsNotEmpty) {
          const alert = await this.alertController.create({
            header: 'Update Info',
            message: 'Your information has been updated.',
            buttons: ['OK']
          });
      
          await alert.present();
        }
      })
})
  }
    
    isValidEmail(email: string) : boolean {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      console.log(emailPattern.test(email))
      return emailPattern.test(email);
    }
    isValidPhoneNumber(phoneNumber: string): boolean {
      const phonePattern = /^\[1-9]\d{7}$/;
      console.log(phoneNumber,phonePattern.test(phoneNumber));
      //return phonePattern.test(phoneNumber);
      return true
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
}