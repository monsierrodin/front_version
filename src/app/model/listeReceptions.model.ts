export interface ListReceptionsBack {
    id: number;
    taches: number;
    dateReception: Date;
    operationEntree:{
        id?:number,
        nameDoc?:string,
        nameAudio?:string,
        codeTache?:string,
        nomDocument?:string,
        nomAudio?:string
        status?:string,
        appUser:{
          nom?:string,
        }
   }
   appUser:{
        id?:number,
        nom?:string

   }



}
