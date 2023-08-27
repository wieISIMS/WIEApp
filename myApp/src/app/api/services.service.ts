import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
const apiUrl = environment.api_url;
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient) { 
  }
  getOurClub():Observable<any[]>{
    return this.http.get<any[]>(apiUrl+'/clubs/');
  }
  login(username:string,password:string){
    let data={
      "username":username,
      "password":password
    }
    return this.http.post<any>(apiUrl+ '/login/', data)
  }
}
