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
  getMemberInfo(id:any):Observable<any>{

   return this.http.get<any>(apiUrl+'/infomembre/'+id+'/');
}
  getLastEvent():Observable<any[]>{

  return this.http.get<any>(apiUrl+'/lastEvent/');
}
getLatestNews():Observable<any[]>{

  return this.http.get<any>(apiUrl+'/latestNews/');
}
searchEvent(title:any):Observable<any[]>{
 let data={
  
   "title":title
 }
  return this.http.post<any>(apiUrl+'/searchE/',data);
}
getEventDetail(id:string):Observable<any>{

  return this.http.get<any>(apiUrl+'/EventDetails/'+id);
}
}