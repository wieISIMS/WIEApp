import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private url:HttpClient) { 
  }
  getOurClub():Observable<any[]>{
    return this.url.get<any[]>(`${environment.api_url}/clubs/`);
  }
}
