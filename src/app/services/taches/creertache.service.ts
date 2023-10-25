import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reception } from 'src/app/model/Reception.model';
import { ListOperation } from 'src/app/model/listeTache.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreertacheService {

  constructor(private http: HttpClient) { }

  public creerTache() {
    this.http.post
  }

  public receptionTache(reception:Reception):Observable<any>{
    return this.http.post(environment.backEndHost+ "/api/v1/createReception",reception);
  }
  
  public telecahrgerFihier(filename: string) : Observable<HttpEvent<Blob>>{
    return this.http.get(environment.backEndHost+"/api/v1/teldoc"+filename,{
      observe:'events',
      responseType: 'blob'
 });
  }
  public listTache():Observable<Array<ListOperation>>{
    return this.http.get<Array<ListOperation>>(environment.backEndHost+"api/v1/list_task");
  }

}
