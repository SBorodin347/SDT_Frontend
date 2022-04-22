import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, timestamp} from "rxjs";
import {tap} from "rxjs/operators";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/authentication';

  constructor(private http: HttpClient) {
  }

  private token = null;

  isLogged(): boolean{
    if(localStorage.getItem('token')!=null) {
      return true;
    }
  }

  register() {}

  login(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(user.username +':'+ user.password)
    });

    return this.http.post<any>(this.apiUrl, null, {headers, observe: 'response'}).pipe(
      tap(response => this.setToken(response.headers.get("Authorization")))
    )
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(): string{
    return localStorage.getItem('token');
  }



}
