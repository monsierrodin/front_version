import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/model/login.model';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { environment } from 'src/environments/environment';
import { UtilisateurAuthService } from './utilisateur-auth.service';
import { Chat } from '../model/Chat.model';
import { GroupMess } from '../model/GroupMess.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient, private servicesAuth: UtilisateurAuthService) { }

  public enregistrerUtilisateur(utilisateur: Utilisateur): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/v1/register", utilisateur);
  }
  public listUtilisateur(): Observable<Array<Utilisateur>> {
    return this.http.get<Array<Utilisateur>>(environment.backEndHost + "/api/v1/user_list");
  }
  public listMessage(): Observable<Array<Chat>> {
    return this.http.get<Array<Chat>>(environment.backEndHost + "/api/v1/list_message");
  }
  public listGroup(): Observable<Array<GroupMess>> {
    return this.http.get<Array<GroupMess>>(environment.backEndHost + "/api/v1/list_messageGroup");
  }
  public authentification(login: Login): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/v1/connexion", login);
  }
  public roleUtilisateur() {
    return this.servicesAuth.getRole();
  }
  public getMatch(routeEnctive: string): boolean {
    if (routeEnctive === this.servicesAuth.getRole()) {
      return true;
    } else return false;
  }

}
