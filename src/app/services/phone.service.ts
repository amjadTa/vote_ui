import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  private readonly apiController: string = 'update';
  private user_name: string = localStorage.getItem('userName');

  constructor(private api: HttpService) { }

  clphiNumbers(): Observable<any> {
    return this.api.get(this.apiController + '/get_calphis_numbers');
  }

  circles(): Observable<any> {
    return this.api.get(this.apiController + '/get_circles');
  }

  list(number:any, circle: any, light: any): Observable<any> {
    const params = new HttpParams()
    .set('number', `${number}`)
    .set('circle', `${circle}`)
    .set('user_name', `${this.user_name}`)
    .set('light', `${light}`); 
    return this.api.get(this.apiController + '/voters_list', {params});
  }

  getPhone(id: any): Observable<any> {
    const item = {id: id};
    return this.api.post(this.apiController + '/get_phone', item);
  }

  getVotersReport(): Observable<any> {
    const item = {};
    return this.api.get(this.apiController + '/voters_report', item);
  }

  getCirclesReport(): Observable<any> {
    const item = {};
    return this.api.get(this.apiController + '/circles_report', item);
  }
}
