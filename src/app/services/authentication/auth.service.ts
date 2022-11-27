import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://backend:8080/api/authentication';
  // private apiUrl = environment.backendUrl + '/authentication';

  constructor(private http: HttpClient, private router: Router) {
  }

  private token = null;

  isLogged(): boolean{
    if(this.getToken()!=null) {
      return true;
    }
  }

  register() {}

  public user: User;

  login(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(user.username +':'+ user.password)
    });
    console.log('aaa:' + this.apiUrl);
    return this.http.post<any>(this.apiUrl, null, {headers, observe: 'response'}).pipe(
      tap(response =>{
        this.user = response.body,
        this.setToken(response.headers.get("Authorization")),
         this.setUserRoles(),
          this.setUserId();
        this.setUserFirstName();
      }
    ));
  }

  logout(): void{
    this.router.navigate(['/login']);
    this.removeToken();
    localStorage.clear();
  }


  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(): string{
    return localStorage.getItem('token');
  }

  setUserId(): void{
    localStorage.setItem('id', this.user.id.toString());
  }

  setUserFirstName(): void{
    localStorage.setItem('firstName', this.user.firstName);
  }

  getUserId(): number{
    return Number(localStorage.getItem('id'));
  }

  setUserRoles(): void{
    localStorage.setItem('roles', JSON.stringify(this.user.roles));
  }

  getUserRoles(): string[]{
    return JSON.parse(localStorage.getItem('roles'));
  }

  removeToken(): void{
    localStorage.removeItem('token');
  }

}
