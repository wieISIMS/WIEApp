import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../api/services.service';

@Component({
  selector: 'app-sign2',
  templateUrl: './sign2.page.html',
  styleUrls: ['./sign2.page.scss'],
})
export class Sign2Page implements OnInit {
  defaultImg = '../../assets/default-user.jpg'; // Default image path
  img = this.defaultImg; // Initialize img with the default image
  isChecked: boolean = false;
  phoneNumber: string = '';
  firstName: string = '';
  familyName: string = '';
  errormessage: string = '';
  errormessagename: string = '';
  errormessagefname: string = '';
  email: string = '';
  pwd: string = '';
  new_photo: any;

  constructor(private router: Router, private service: ServicesService) {}

  isValidPhoneNumber(phoneNumber: string): boolean {
    const phonePattern = /^[1-9]\d{7}$/;
    return phonePattern.test(phoneNumber);
  }

  confirm() {
    if (this.firstName === '') {
      this.errormessagename = 'Please enter a valid name! ';
    }
    if (this.familyName === '') {
      this.errormessagefname = 'Please enter a valid family name ! ';
    }
    if (this.phoneNumber === '') {
      this.errormessage = 'Please enter a valid phone number ! ';
    } else if (!this.isValidPhoneNumber(this.phoneNumber)) {
      console.log('Invalid phone number.');
      this.errormessage = 'Invalid phone number !';
      return;
    }

    if (this.errormessagename === this.errormessage) {
      this.service.signUp(this.email, this.pwd, this.phoneNumber, this.firstName, this.familyName, this.new_photo).subscribe(data => {
        if (data.message == true) {
          console.log(data);
          localStorage.setItem('token', data.id);
          this.router.navigate(['/tablinks']);
        }
      });
    }
  }

  clearErrorMessage(errorVariable: string) {
    if (errorVariable === 'errormessagename') {
      this.errormessagename = '';
    } else if (errorVariable === 'errormessagefname') {
      this.errormessagefname = '';
    } else if (errorVariable === 'errormessage') {
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
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (typeof event.target!.result === 'string') {
          this.img = event.target!.result; // Update the img variable with the selected image
          this.new_photo = this.img; // Update the new_photo variable with the selected image
        }
      };
    } else {
      // If no image is selected, revert to the default image
      this.img = this.defaultImg;
      this.new_photo = null; // Set new_photo to null since no image is selected
    }
  }

  openFileSelector() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Accept only image files
    input.addEventListener('change', this.onFileSelected.bind(this));
    input.click();
  }
}
