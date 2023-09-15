import { Component } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  name:string
  password:string
  
  constructor(private service:NavService,private router:Router) {}
  login(){
    this.service.loginClub(this.name,this.password).subscribe(res=>{
      if(res.token){
        localStorage.setItem('token',res.token);
        this.router.navigate(['/dashboard']);
      }
     
    })
  }
}
