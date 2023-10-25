
export class ChatRequest {
    idUserDes?: number;
    idUserExp?: number;
    idExp?: number;
    message?: number;
    dateMsg?: Date;
};
export class GetChat {
    idDes?: number;
    idExp?: number;
}
//group info
export class GroupRequst {
    id?: number;
    nom?: string;
}
export class ChatGroupRequest {
    idUser?: number;
    idGroup?: number;
    message?: number;
    dateMsg?: Date;
};
export class ChatByMessageLength{
    sumMessage?:number
    user?:{
        id:number
    }

}
