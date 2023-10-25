export interface ListTraitementTout {
    id: number;
    dateTraitement: Date;
    mot: number;
    page: number;
    message:string;
    reception:{
        id?:number,
        taches?:string,
        dateReception?:Date,
        operationEntree:{
               description?:string,
               codeTache?:string,
               dateOperation?:Date,
               status?:string,
               nameDoc?:string,
               nameAudio?:string,
               nomDocument?:string,
               nomAudio?:string,
               appUser:{
                    id?:number,
                    nom?:string,
                    email?:string,
                    role?:string,
               }
        }
        appUser:{
               id?:number,
               nom?:string,
               email?:string,
        }
   }


}
export interface ListTacheTout {
       id: number;
       description?:string,
       codeTache?:string,
       dateOperation?:Date,
       status?:string,
       nameDoc?:string,
       nameAudi?:string,
       appUser:{
              id?:number,
              nom?:string,
              email?:string,
              role?:string,
                  }
}
