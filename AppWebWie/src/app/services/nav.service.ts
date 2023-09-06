import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject,Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NavService {

    public currentUrl = new BehaviorSubject<any>(undefined);

    constructor(private router: Router , private http:HttpClient) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }
    getStatClub(id:string):Observable<any>{
        return this.http.get<any>("http://127.0.0.1:8000/statClub/"+id);
    }

}
