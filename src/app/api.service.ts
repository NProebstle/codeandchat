import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { History } from './components/shared/models/history';
import { ProfileArray } from './components/shared/models/profileArray';
import { MessageArray } from './components/shared/models/messageArray';

@Injectable()
export class ApiService {

  private API_URL: string;

  constructor(private http: HttpClient) { 
    //this.API_URL = 'http://EasychatServer-env.2hsthwmma5.eu-central-1.elasticbeanstalk.com:3000';
    this.API_URL = 'http://localhost:3000';
  }

  //ChatHistory bekommen
  public getChatHistory(): Observable<History[]> {
    return this.http.get<History[]>(this.API_URL + '/history');
  }

  public getPush(): Observable<History> {
    return this.http.get<History>(this.API_URL + '/push');
  }

  //Profil senden
  public addProfile(profile: ProfileArray): Observable<ProfileArray> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<ProfileArray>(this.API_URL + '/profiles', profile, options);
  }

  //Neue Nachricht absenden/bekommen
  public sendMsg(message: MessageArray): Observable<MessageArray> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<MessageArray>(this.API_URL + '/history', message, options);
  }
}
