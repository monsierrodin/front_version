export class Reception {
     id?: number;
     idUser?: number;
     idOperation?: number;
     dateReception?:Date;
     operationEntree:{
          id?:number,
          nameDoc?:string,
          nameAudio?:string,
          status?:string,
          priority?:string,
     }
     appUser:{
          nom?:string
     }
}

export interface Users {
     id: number;
     nom: string;
     email: string;
     password: string;
 }