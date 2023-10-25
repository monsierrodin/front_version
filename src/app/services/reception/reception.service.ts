import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListReceptionsBack } from 'src/app/model/listeReceptions.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  constructor(private http:HttpClient) { }

  public getListeRecByClient(id: number): Observable<Array<ListReceptionsBack>> {
    return this.http.get<Array<ListReceptionsBack>>(environment.backEndHost + "/api/v1/list_Receptions/" + id);
  }
  public getListeRecep(): Observable<Array<ListReceptionsBack>> {
    return this.http.get<Array<ListReceptionsBack>>(environment.backEndHost + "/api/v1/list_recetion");
  }
}
