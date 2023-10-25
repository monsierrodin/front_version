import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListTacheTout, ListTraitementTout } from 'src/app/model/ListTraitementTout.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TraitementService {

  constructor(private http:HttpClient) { }
  public getListeTraiteTout(): Observable<Array<ListTraitementTout>> {
    return this.http.get<Array<ListTraitementTout>>(environment.backEndHost + "/api/v1/your_liste_traitement");
  }
  public getTache(): Observable<Array<ListTacheTout>> {
    return this.http.get<Array<ListTacheTout>>(environment.backEndHost + "/api/v1/list_task");
  }

  public suprimmerTraitement(id:number){
    return this.http.delete(environment.backEndHost+'/api/v1/delete_traitement/'+id);
  }
  public suprimmerUser(id:number){
    return this.http.delete(environment.backEndHost+'/api/v1/delete_user/'+id);
  }
  public validerTraitement(id:number){
    return this.http.get(environment.backEndHost+'/api/v1/validerTraitement/'+id);
  } 
}
