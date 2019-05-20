import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { History } from './components/shared/models/history';
import { ProfileArray } from './components/shared/models/profileArray';
import { MessageArray } from './components/shared/models/messageArray';
import { DateTime } from './components/shared/models/dateTime';
import { Ping } from './components/shared/models/ping';
import { ActiveUsers } from './components/shared/models/activeUsers';
import { AotCompiler } from '@angular/compiler';

@Injectable()
export class ApiService {

  private API_URL: string;

  constructor(private http: HttpClient) { 
    this.API_URL = 'http://easychat.eu-central-1.elasticbeanstalk.com:3000';
    //this.API_URL = 'http://localhost:3000';
  }

  //ChatHistory bekommen
  public getChatHistory(): Observable<History[]> {
    return this.http.get<History[]>(this.API_URL + '/history');
  }

  //Msg bekommen
  public getPush(): Observable<History> {
    return this.http.get<History>(this.API_URL + '/push');
  }

  //Zeit bekommen
  public getDate(): Observable<DateTime> {
    return this.http.get<DateTime>(this.API_URL + '/date');
  }
  
  //Ping empfangen
  public getPing(): Observable<ActiveUsers> {
    return this.http.get<ActiveUsers>(this.API_URL + '/ping');
  }

  //Ping senden
  public sendPing(ping: Ping): Observable<Ping> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<Ping>(this.API_URL + '/ping', ping, options);
  }

  //Profil senden
  public addProfile(profile: ProfileArray): Observable<ProfileArray> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    console.log('[API] Sent Profile!');
    return this.http.post<ProfileArray>(this.API_URL + '/profile', profile, options);
  }

  //Neue Nachricht absenden/bekommen
  public sendMsg(message: MessageArray): Observable<MessageArray> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<MessageArray>(this.API_URL + '/history', message, options);
  }
}
