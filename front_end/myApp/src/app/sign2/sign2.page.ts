import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { ServicesService } from '../api/services.service'; 
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
  email:string='';
  pwd:string='';
  new_photo: any;
  constructor(private router: Router,
    private service:ServicesService) {}

  isValidPhoneNumber(phoneNumber: string): boolean {
    const phonePattern = /^\[1-9]\d{7}$/;
    // return phonePattern.test(phoneNumber);
    return true;
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
      this.service.signUp(this.email,this.pwd,this.phoneNumber,this.firstName,this.familyName,this.new_photo).subscribe(data=>{
        if(data.message == true){
          console.log(data)
        localStorage.setItem('token',data.id)
        this.router.navigate(['/tablinks'])
      }
      });
      
    
    
    
    }
  }
  
  clearErrorMessage(errorVariable: string) {
    if (errorVariable === 'errormessagename') {
      this.errormessagename = '';
    } else if (errorVariable === 'errormessagefname') {
      this.errormessagefname = '';
    }
    else if (errorVariable === 'errormessage') {
      this.errormessage = '';
    }
  }

  ngOnInit() {
    this.email = history.state.mail;
    this.pwd = history.state.password;
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
    
    let reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onload=(event)=>{
    this.new_photo=event.target!.result
    }
    }
  }

  openFileSelector() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; //Accepte uniquement les fichiers d'image
    input.addEventListener('change', this.onFileSelected.bind(this));
    input.click();
  }
  
}


