import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;

@Component({
  selector: 'app-sign2',
  templateUrl: './sign2.page.html',
  styleUrls: ['./sign2.page.scss'],
})
export class Sign2Page implements OnInit {
  isChecked: boolean = false;
  phoneNumber: string='';
  firstName: string='';
  familyName:string='';
  errormessage: string ='';
  errormessagename: string ='';
  errormessagefname:string='';
  constructor(private router: Router) {}

  isValidPhoneNumber(phoneNumber: string): boolean {
    const phonePattern = /^[1-9]\d{1}[0-9]\d{1}[0-9]\d{4}$/;
    return phonePattern.test(phoneNumber);
  }

  
  confirm(){
    if (this.firstName==''){
      this.errormessagename = 'Please enter a valid  name! ';
    }
    
    //familyname
    if (this.familyName==''){
      this.errormessagefname = 'Please enter a valid family name ! ';
    }
   
    if (this.phoneNumber==''){
      this.errormessage = 'Please enter a valid phone number ! ';
    }
    else if (!this.isValidPhoneNumber(this.phoneNumber)) {
      console.log('Invalid phone number.');
      this.errormessage='Invalid phone number !';
      return;
    }
         
    if(this.errormessagename==this.errormessage){
      this.router.navigate(['/tablinks'])
    }
    
    
  }
  
  

  ngOnInit() {
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
  
}


