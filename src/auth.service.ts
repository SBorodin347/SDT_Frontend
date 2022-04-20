import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User} from "./app/models/user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private apiUrl = 'http://localhost:8080/api/authentication';

  constructor(private http: HttpClient, private router: Router) {
  }

  register() {}

  private token;

  login(user: User): Observable<{token: string}> {
  let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(user.username +':'+ user.password)
      }),
    };
    return this.http.post<{token:string}>(this.apiUrl, null, httpOptions).pipe(
      tap( ({token}) => {
        localStorage.setItem('auth-token', token)
        this.setToken(token)
      } )
    )
  }

  setToken(token: string){
    this.token = token;
  }

  getToken(): string{
    return this.token;
  }

}
