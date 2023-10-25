export interface Utilisateur {
    id: number;
    nom: string;
    email: string;
    password: string
    role: string
    etat:number
    status:number
}
export class UtilisateurRequest{
    id?: number;
    nom?:string;
    email?:string;
    password?:string;
    etat?:string;
    status?:string;

}
