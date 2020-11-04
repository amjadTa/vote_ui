import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateVoterService {

  private readonly apiController: string = 'update';

  constructor(private api: HttpService) { }
  
  searchById(id: any): Observable<any> {
    const params = new HttpParams()
    .set('id', `${id}`);
    return this.api.get(this.apiController + '/search_by_id', { params });
  }

  searchByBox(boxNumber: any, serial: any): Observable<any> {
    const params = new HttpParams()
    .set('boxNumber', `${boxNumber}`)
    .set('serial', `${serial}`);
    return this.api.get(this.apiController + '/search_by_box', { params });
  }

  updateVoting(id: any): Observable<any> {
    const item = {id: id};
    return this.api.post(this.apiController + '/update_vote', item);
  }

  addVoteer(item: any): Observable<any> {
    return this.api.post(`${this.apiController}/add_voter`, item);
  }
}
