export class RecepClient {
     id?: number;
     dateTraitement?: Date;
     mot?: number;
     page?:Date;
     message?:string;
     reception:{
          id?:number,
          dateReception?:Date,
          operationEntree:{
               dateOperation?:Date;
          }
     }
     
}

export interface UserTe {
     id: number;
     nom: string;
     email: string;
     password: string;
 }