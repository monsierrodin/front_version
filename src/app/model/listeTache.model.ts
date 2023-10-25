export interface ListOperation {
    id: number;
    description: string;
    client: string;
    status: string;
    priority: string;
    mot?:number;
    codeTache: string;
    dateOperation:Date;
    appUser:{
        nom?:string;
    }



}