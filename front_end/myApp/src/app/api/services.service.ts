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
  //Home services
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
//Event services
participateEvent(ide:any,idm:any):Observable<any[]>{
  let data={
    "ide":ide,
    "idm":idm
  }
  return this.http.post<any>(apiUrl+'/ParEvent/',data);
}
verifParticipate(ide:any,idm:any):Observable<any>{
  let data={
    "ide":ide,
    "idm":idm
  }
  return this.http.post<any>(apiUrl+'/verifPar/',data);
}
finishedEvent(id:any):Observable<any>{
  return this.http.get<any>(apiUrl+'/finishedEvent/'+id);
}

//activities services
getMemberEvents(id:any):Observable<any>{
  return this.http.get<any>(apiUrl+'/memberEvents/'+id);
}
getMemberClubs(id:any):Observable<any>{
  return this.http.get<any>(apiUrl+'/memberClubs/'+id);
}

//Club services
getBestEvents(id:any):Observable<any>{
  return this.http.get<any>(apiUrl+'/bestEvents/'+id);
}
getClubEvents(id:any):Observable<any>{
  return this.http.get<any>(apiUrl+'/clubEvents/'+id);
}
//calander
getCalender(idMember:any,date:any):Observable<any>{
  let data={
    "idMember":idMember,
    "date":date
  }
  return this.http.post<any>(apiUrl+'/calendEvents/',data);
}
//Notifications
getAllNotif(id:any):Observable<any>{
  return this.http.get<any>(apiUrl+'/allNotif/'+id);
}

updateProfile(idMember:any,new_email:any,new_pwd:any,new_photo:any,new_phoneNumber:any):Observable<any>{
  let data={
    "idMember":idMember,
    "new_email":new_email,
    "new_pwd":new_pwd,
    "new_photo":new_photo,
    "new_phoneNumber":new_phoneNumber
  }
  return this.http.post<any>(apiUrl+'/updateProfile/',data);
}
//Sing up
signUp(email:any,password:any,phoneNumber:any,firstName:any,familyName:any,photo:any){
  let data={
    "email":email,
    "password":password,
    "phoneNumber":phoneNumber,
    "firstName":firstName,
    "familyName":familyName,
    "photo":photo
  }
  console.log(data);
  return this.http.post<any>(apiUrl+ '/signUp/', data)
}
}
