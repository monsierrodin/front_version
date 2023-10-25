import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListOperation } from 'src/app/model/listeTache.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TachesService {


  constructor(private http: HttpClient) { }


  public getListeByClient(id: number): Observable<Array<ListOperation>> {
    return this.http.get<Array<ListOperation>>(environment.backEndHost + "/api/v1/list_Taches/" + id);
  }
  public suprimmerTache(id:number){
    return this.http.delete(environment.backEndHost+"/api/v1/deleteOperation/"+id);
  }
}
