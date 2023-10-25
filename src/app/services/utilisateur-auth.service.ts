import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurAuthService {

  constructor() { }
  public setRole(role: string) {
    localStorage.setItem("role", role);
  }

  public getRole() {
    return localStorage.getItem('role');
  }

  public setNom(nom: string) {
    localStorage.setItem("nom", nom);
  }

  public getNom() {
    return localStorage.getItem('nom');
  }
  public setEmail(email: string) {
    localStorage.setItem("email", email);
  }

  public getEmail() {
    return localStorage.getItem('email');
  }
  public setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }
  public getToken() {
    return localStorage.getItem('jwtToken');
  }
  public clear() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
  }
  public isLoggeIn() {
    return this.getRole() && this.getToken();
  }
  public setIdUser(id: number) {
    var idLocal = id.toString();
    localStorage.setItem('idUser', idLocal);
  }
  public getIdUser() {
    var idGet = localStorage.getItem('idUser');
    return idGet;
  }
  public setStatus(status: number) {
    var statuc = status.toString();
    localStorage.setItem('status', statuc);
  }
  public getStatus() {
    var statusGet = localStorage.getItem('status');
    return statusGet;
  }
  public setEtat(etat: number) {
    var etatc = etat.toString();
    localStorage.setItem('etat', etatc);
  }
  public getEtat() {
    var etatGet = localStorage.getItem('etat');
    return etatGet;
  }
}
