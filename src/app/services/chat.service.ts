import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { UtilisateurRequest } from 'src/app/model/utilisateur.model';
import { environment } from 'src/environments/environment';
import { ChatByMessageLength, ChatGroupRequest, ChatRequest, GetChat, GroupRequst } from '../model/chatRequest.mode';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  token!: string
  constructor(private http: HttpClient, ) {

  }
 
  // info chat
  public getUtilisateur(): Observable<UtilisateurRequest> {
    return this.http.get<UtilisateurRequest>(environment.backEndHost + "/api/v1/user_list");
  }
  public getUtilisateurById(id: number): Observable<UtilisateurRequest> {
    return this.http.get<UtilisateurRequest>(environment.backEndHost + "/api/v1/utilisateurById/" + id);
  }
  public getUtilisateurByEmail(email: string): Observable<UtilisateurRequest> {
    return this.http.get<UtilisateurRequest>(environment.backEndHost + "/api/v1/utilisateur_email/" + email);
  }
  public ajouterMessage(chatRequest: ChatRequest): Observable<ChatRequest> {
    return this.http.post<ChatRequest>(environment.backEndHost + "/api/v1/save_Chat", chatRequest);
  }
  public getMessage(getChat: GetChat): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/v1/list_Chat", getChat);
  }
  public getMessages(): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/v1/list_Chats");
  }
  // info group
  public ajouterGroup(request: GroupRequst): Observable<GroupRequst> {
    return this.http.post<GroupRequst>(environment.backEndHost + "/api/v1/save_Group", request);
  }
  public getListGroup(): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/v1/list_Group");
  }
  public getListUserByGroup(id: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/v1/list_userByChat/" + id);
  }
  public getListUserNoByGroup(id: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/v1/list_userNoByChat/" + id);
  }
  public addUserByGroup(idGroup: number, idUser: number): Observable<any> {
    const data = {
      idUser: idUser,
      idGroup: idGroup
    }
    return this.http.post(environment.backEndHost + "/api/v1/add_UserByGroup", data);
  }
  public ajouterMessageBychat(chatRequest: ChatGroupRequest): Observable<ChatGroupRequest> {
    return this.http.post<ChatGroupRequest>(environment.backEndHost + "/api/v1/save_ChatGroup", chatRequest);
  }
  public getMessagesByGroup(idGroup: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/v1/list_ChatsByGroup/" + idGroup);
  }
  public listUserByLength(idDes: number): Observable<ChatByMessageLength> {
    return this.http.get(environment.backEndHost + "/api/v1/list_UserIsLength/" + idDes);
  }
  public modifierMessageVu(idDes: number,idExp:number): Observable<void> {
    return this.http.get<void>(environment.backEndHost + "/api/v1/modifierStatMessage?idDes=" + idDes + "&idExp=" +idExp);
  }

}
