import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { History } from './components/shared/models/history';


const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http: HttpClientModule;

  constructor() { }

  //  public getChatHistory(): Observable<History> {
  //   return this.http
  //     .get(API_URL + '/todos')
  //     .map(response => {
  //       const todos = response.json();
  //       return todos.map((todo) => new Todo(todo));
  //     })
  //     .catch(this.handleError);
  // }

  // //Antwort bekommen
  // public getNewMsg(todoId: number): Observable<History> {
  //   return this.http
  //     .get(API_URL + '/todos/' + todoId)
  //     .map(response => {
  //       return new Todo(response.json());
  //     })
  //     .catch(this.handleError);
  // }

  // public sendMsg(todo: Todo): Observable<Todo> {
  //   return this.http
  //     .post(API_URL + '/todos', todo)
  //     .map(response => {
  //       return new Todo(response.json());
  //     })
  //     .catch(this.handleError);
  // }


  // private handleError (error: Response | any) {
  //   console.error('ApiService::handleError', error);
  //   return Observable.throw(error);
  // }
}
