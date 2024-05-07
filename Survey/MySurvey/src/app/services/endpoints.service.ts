import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserDetails} from "../interface/user-dto";
import {SurveyDTO} from "../interface/surver-dto";

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(private http: HttpClient) { }

  getData(type: string): Observable<any> {
    return this.http.get(`http://localhost:8090/api/survey/get/stats/${type}`);
  }

  saveData(user: UserDetails, survey: SurveyDTO , type: string): Observable<any> {
    return this.http.post(`http://localhost:8090/api/survey/post/participate/${type}`, { user, survey });
  }
}
