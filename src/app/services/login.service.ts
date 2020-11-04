import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiController: string = 'users';

  constructor(private api: HttpService) { }

  login(id: string, password: string): Observable<any> {
    const item = {
      id: id,
      password: password
    };
    const params = new HttpParams()
    .set('id', `${id}`)
    .set('password', `${password}`);
    return this.api.post(this.apiController + '/login', item);
  }

  getUsers(): Observable<any> {
    return this.api.get(this.apiController + '/get_all_users');
  }

  updatePassword(id: any, password: any): Observable<any> {
    const item = {password: password, id: id};
    return this.api.post(this.apiController + '/update_password', item);
  }

  createNewUser(item: any): Observable<any> {
    return this.api.post(this.apiController + '/sign-up', item);
  }
}
