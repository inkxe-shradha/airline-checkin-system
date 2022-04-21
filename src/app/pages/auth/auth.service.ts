import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl: string = environment.BASE_URL;

  signIn(userId: string | number): Observable<User> {
    return this.http.get<User>(this.baseUrl.concat('users/' + String(userId)));
  }

}
