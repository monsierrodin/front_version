import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/file.service';
import { ListTacheTout, ListTraitementTout } from 'src/app/model/ListTraitementTout.model';
import { RecepClient } from 'src/app/model/Resultat';
import { ListReceptionsBack } from 'src/app/model/listeReceptions.model';
import { ChatService } from 'src/app/services/chat.service';
import { ReceptionService } from 'src/app/services/reception/reception.service';
import { TraitementService } from 'src/app/services/traitement/traitement.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  test:RecepClient=new RecepClient
///|paginate:{itemsPerPage:4,currentPage:page,totalItems:totalLenght}
/*<div class="pagination">
            <pagination-controls (pageChange)="page=$event"></pagination-controls>
        </div>*/
  totalLenght:any;
  page:number=1;
  User:any



  list_traitee_back=0
  list_validation_back=0
  list_encours_bac=0
  result_back:any
  result_back1:any
  result_back2:any

  totalBackTache=0;


  filenames: string[]=[];
  hide:boolean=false
  mess!:string
  fileStatus={status:'', requestType:'uploading ...', percent : 0};
  idUser:any=this.userService.getIdUser();
  role:any=this.userService.getRole();
  listeReceptionsBack:Array<ListReceptionsBack>
  listeReceptionsBack2:Array<ListReceptionsBack>
  resultats:Observable<Array<ListTraitementTout>>
  result8:Observable<Array<ListReceptionsBack>>
  tacheTout:Observable<Array<ListTacheTout>>
  resultat:any
  result:any
  inputRech?:any
  inputRech1?:any
  inputRech9?:any
  list_validation=0;
  utilisateur: any
  list_tout=0;
  list_encours=0;
  list_instance=0;
  inputRech3?:any
  totalConst = 0;
  totalPage=0;
  showLabel = true;
  list_traitee=0;
  reduce:any
  tache:any
  tacheEncours:any
  tacheInstance:any
  itemAnnee:any
  itemDat:any
  list_traitee_backOffice=0;
  list_validation_backOffice=0;
  list_encour_BackOffice=0;
  result_back7:any
  result_back8:any
  result_back9:any
  testt:any;
  testt2:any

  years = Array.from({length: 146}, (_, i) => 2022 + i);
  constructor(private ListReceptions:ReceptionService,private service: ChatService,private router:Router,private serviceTraiteTout:TraitementService,private ListesReception:ReceptionService,private userService:UtilisateurAuthService,private http:HttpClient,private fileService:FileService,private root:Router) { }

  ngOnInit(): void {
    this.getUtilisateur()
    if(this.role=='ADMIN'){
      //role:any=this.serviceUser.getRole();
      //private serviceUser:UtilisateurAuthService
      //this.router.navigate(['/']);
      //private router:Router
      this.getStat();
    }else if(this.role=='BACKOFFICE'){
      this.getStat();
    }else if(this.role=='CLIENT'){
    this.router.navigate(['/']);
    }else{
    this.router.navigate(['/']);

  }
  }
  getStat(){
    this.resultats=this.serviceTraiteTout.getListeTraiteTout();
    if(this.role=="BACKOFFICE"){
      this.resultats.subscribe(
        data=>{
          //resultats:Observable<Array<ListTraitementTout>>
          //
      this.resultat= data.filter((d)=>{
        let itemDate=new Date(d.dateTraitement);
        return d.reception.appUser.id==this.idUser;
        })

      }
      //BackOffice
      )

    }else if(this.role=="ADMIN"){
      this.getUtilisateur();
      this.resultats.subscribe(
        data=>{
      this.resultat= data

         return data;

      }
      )
    }else{
    this.resultats.subscribe(
        data=>{
    this.resultat= data.filter((d)=>{

       return d.reception.operationEntree.appUser.id==this.idUser;
        })
      }
      )
    }

this.filtreTache();
this.listTout();
this.filtreTacheBac();
  }//this.tache = data;
  //this.list_tout=this.tache.length
listTout(){
  this.tacheTout=this.serviceTraiteTout.getTache();
  this.tacheTout.subscribe(
    data=>{
      this.tache=data;
      this.tacheEncours= data.filter((d)=>{
    return d.status=="En cours";
    })
      this.tacheInstance= data.filter((d)=>{
      return d.status=="En instance";
      })

  this.list_tout=this.tache.length
  this.list_encours=this.tacheEncours.length
  this.list_instance=this.tacheInstance.length
  }
  )
  //nombre de de consignation en cour par un BackOffice
  this.ListesReception.getListeRecByClient(this.idUser).subscribe({
    next:(data)=>{
      //listeReceptionsBack:Array<ListReceptionsBack>
      this.listeReceptionsBack=data.filter((d)=>{
        return d.operationEntree.status=='En cours' && d.appUser.id==this.idUser;

      })
    this.list_encours_bac=this.listeReceptionsBack.length
    }
  })

}
//backOffice
filtreTacheBac(){
  this.resultats=this.serviceTraiteTout.getListeTraiteTout();
  this.resultats.subscribe(
    data=>{
  this.result_back= data.filter((d)=>{
    return d.reception.operationEntree.status=="Traitée" && d.reception.appUser.id==this.idUser ;
    })

  this.result_back1= data.filter((d)=>{
    return d.reception.operationEntree.status=="En Attente" && d.reception.appUser.id==this.idUser ;
    })



  this.list_traitee_back=this.result_back.length

  this.list_validation_back=this.result_back1.length

  }
  )
}
getAnneeB(event:Event){
  const target=event.target as HTMLInputElement;
  const file=target.value
  this.inputRech3=file
  this.itemAnnee=file
this.resultats=this.serviceTraiteTout.getListeTraiteTout();
    this.resultats.subscribe(
      data=>{
    this.resultat= data.filter((d)=>{
     // let itemDate=new Date(d.dateTraitement).getFullYear();
     let itemDate=new Date(d.dateTraitement);
     console.log(this.itemAnnee)
      if((this.inputRech==12||this.inputRech==null) && (this.inputRech3==3||this.inputRech3==null)){

        return data && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";
      }else if((this.inputRech!=12||this.inputRech!=null) && (this.inputRech3==3||this.inputRech3==null)){
        return itemDate.getMonth()==this.inputRech.toLowerCase() && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";
      }else if((this.inputRech==12||this.inputRech==null) && (this.inputRech3!=3||this.inputRech3!=null)){
        return itemDate.getFullYear()==this.inputRech3.toLowerCase() && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";
      }else if((this.inputRech!=12||this.inputRech!=null) && (this.inputRech3!=3||this.inputRech3!=null)){
          return itemDate.getFullYear()==this.inputRech3.toLowerCase()&&itemDate.getMonth()==this.inputRech.toLowerCase() && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";
      } else{
        return itemDate.getFullYear()==this.inputRech3.toLowerCase() && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";
      }
      //return d.reception.operationEntree.appUser.id==this.inputRech.toLowerCase();
         })
    this.totalConst=(this.resultat).reduce((acc,mots)=>acc +mots.mot,0);
    this.totalPage=(this.resultat).reduce((acc,pages)=>acc +pages.page,0);
    }
    )
}
getMoiB(event: Event){
  const target=event.target as HTMLInputElement;
  const file=target.value
  this.inputRech=file
  this.itemDat=file
this.resultats=this.serviceTraiteTout.getListeTraiteTout();
    this.resultats.subscribe(
      data=>{
    this.resultat= data.filter((d)=>{
     // let itemDate=new Date(d.dateTraitement).getFullYear();
     let itemDate=new Date(d.dateTraitement);
     console.log(this.itemDat)
      if((this.inputRech==12||this.inputRech==null) && (this.inputRech3==3||this.inputRech3==null)){
        return data && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";
      }else if(this.inputRech==12 &&(this.inputRech3!=3||this.inputRech3!=null)){
        return itemDate.getFullYear()==this.itemAnnee && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";
      }else if(this.inputRech!=12 &&(this.inputRech3==3||this.inputRech3==null)){
        return itemDate.getMonth()==this.itemDat && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";
      }else{
        return itemDate.getMonth()==this.inputRech.toLowerCase() && itemDate.getFullYear()==this.itemAnnee && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";
      }
      //return d.reception.operationEntree.appUser.id==this.inputRech.toLowerCase();
         })
    this.totalConst=(this.resultat).reduce((acc,mots)=>acc +mots.mot,0);
    this.totalPage=(this.resultat).reduce((acc,pages)=>acc +pages.page,0);
    }
    )
}
getClient(event: Event){
  const target=event.target as HTMLInputElement;
  const file=target.value
  this.inputRech1=file
  //client===this.inputRech1.toLowerCase()
this.resultats=this.serviceTraiteTout.getListeTraiteTout();
    this.resultats.subscribe(
      data=>{
        const filterData=data.filter(
          (item,index,arr)=>index===arr.findIndex((t)=>t.reception.operationEntree.appUser.email===item.reception.operationEntree.appUser.email))

    this.resultat= filterData.filter((d)=>{
     // let itemDate=new Date(d.dateTraitement).getFullYear();
     let itemDate=new Date(d.dateTraitement);
     const client=d.reception.operationEntree.appUser.email
    if((this.inputRech3==null || this.inputRech3==3)&&(this.inputRech==null || this.inputRech==12)){

      return client===this.inputRech1.toLowerCase() && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";
    }else if((this.inputRech3!=null || this.inputRech3!=3)&&(this.inputRech==null || this.inputRech==12)){

      return client===this.inputRech1.toLowerCase() && itemDate.getFullYear()==this.itemAnnee && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";

    }else if((this.inputRech3==null || this.inputRech3==3)&&(this.inputRech!=null || this.inputRech!=12)){

      return client===this.inputRech1.toLowerCase() && itemDate.getMonth()==this.itemDat && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";

    }else{
      return client===this.inputRech1.toLowerCase() && itemDate.getMonth()==this.itemDat && itemDate.getFullYear()==this.itemAnnee && d.reception.appUser.id==this.idUser && d.reception.operationEntree.status=="Traitée";
    }
      //return d.reception.operationEntree.appUser.id==this.inputRech.toLowerCase();
         })
    this.totalConst=(this.resultat).reduce((acc,mots)=>acc +mots.mot,0);
    this.totalPage=(this.resultat).reduce((acc,pages)=>acc +pages.page,0);
    }
    )
}

///


filtreTache(){
  this.resultats=this.serviceTraiteTout.getListeTraiteTout();
  this.resultats.subscribe(
    data=>{
  this.result= data.filter((d)=>{
    return d.reception.operationEntree.status=="Traitée" ;
    })
  this.list_traitee=this.result.length
  this.list_validation= data.length - this.result.length
  }
  )
}

getAnnee(event:Event){
    const target=event.target as HTMLInputElement;
    const file=target.value
    this.inputRech3=file
    this.itemAnnee=file
  this.resultats=this.serviceTraiteTout.getListeTraiteTout();
      this.resultats.subscribe(
        data=>{
      this.resultat= data.filter((d)=>{
       // let itemDate=new Date(d.dateTraitement).getFullYear();
       let itemDate=new Date(d.dateTraitement);
       console.log(this.itemAnnee)
        if((this.inputRech==12||this.inputRech==null) && (this.inputRech3==3||this.inputRech3==null)){

          return data && d.reception.operationEntree.status=="Traitée";
        }else if((this.inputRech!=12||this.inputRech!=null) && (this.inputRech3==3||this.inputRech3==null)){
          return itemDate.getMonth()==this.inputRech.toLowerCase() && d.reception.operationEntree.status=="Traitée";
        }else if((this.inputRech==12||this.inputRech==null) && (this.inputRech3!=3||this.inputRech3!=null)){
          return itemDate.getFullYear()==this.inputRech3.toLowerCase() && d.reception.operationEntree.status=="Traitée";
        }else if((this.inputRech!=12||this.inputRech!=null) && (this.inputRech3!=3||this.inputRech3!=null)){
            return itemDate.getFullYear()==this.inputRech3.toLowerCase()&&itemDate.getMonth()==this.inputRech.toLowerCase() && d.reception.operationEntree.status=="Traitée";
        } else{
          return itemDate.getFullYear()==this.inputRech3.toLowerCase() && d.reception.operationEntree.status=="Traitée";
        }
        //return d.reception.operationEntree.appUser.id==this.inputRech.toLowerCase();
           })
      this.totalConst=(this.resultat).reduce((acc,mots)=>acc +mots.mot,0);
      this.totalPage=(this.resultat).reduce((acc,pages)=>acc +pages.page,0);
      }
      )
}
getMoi(event: Event){
    const target=event.target as HTMLInputElement;
    const file=target.value
    this.inputRech=file
    this.itemDat=file
  this.resultats=this.serviceTraiteTout.getListeTraiteTout();
      this.resultats.subscribe(
        data=>{
      this.resultat= data.filter((d)=>{
       // let itemDate=new Date(d.dateTraitement).getFullYear();
       let itemDate=new Date(d.dateTraitement);
       console.log(this.itemDat)
        if((this.inputRech==12||this.inputRech==null) && (this.inputRech3==3||this.inputRech3==null)){
          return data && d.reception.operationEntree.status=="Traitée";
        }else if(this.inputRech==12 &&(this.inputRech3!=3||this.inputRech3!=null)){
          return itemDate.getFullYear()==this.itemAnnee && d.reception.operationEntree.status=="Traitée";
        }else if(this.inputRech!=12 &&(this.inputRech3==3||this.inputRech3==null)){
          return itemDate.getMonth()==this.itemDat && d.reception.operationEntree.status=="Traitée";
        }else{
          return itemDate.getMonth()==this.inputRech.toLowerCase() && itemDate.getFullYear()==this.itemAnnee && d.reception.operationEntree.status=="Traitée";
        }
        //return d.reception.operationEntree.appUser.id==this.inputRech.toLowerCase();
           })
      this.totalConst=(this.resultat).reduce((acc,mots)=>acc +mots.mot,0);
      this.totalPage=(this.resultat).reduce((acc,pages)=>acc +pages.page,0);
      }
      )
  }
  //Rodin andriamalaza 0347144597
  getClientB(event: Event){
    const target=event.target as HTMLInputElement;
    const file=target.value
    this.inputRech1=file
  this.resultats=this.serviceTraiteTout.getListeTraiteTout();
      this.resultats.subscribe(
        data=>{
          const filterData=data.filter(
          (item,index,arr)=>index===arr.findIndex((t)=>t.reception.operationEntree.appUser.email===item.reception.operationEntree.appUser.email))
      this.resultat= filterData.filter((d)=>{

       // let itemDate=new Date(d.dateTraitement).getFullYear();
       let itemDate=new Date(d.dateTraitement);
       const client=d.reception.operationEntree.appUser.email
      if((this.inputRech3==null || this.inputRech3==3)&&(this.inputRech==null || this.inputRech==12)){

        return client===this.inputRech1.toLowerCase() && d.reception.operationEntree.status=="Traitée";
      }else if((this.inputRech3!=null || this.inputRech3!=3)&&(this.inputRech==null || this.inputRech==12)){

        return client===this.inputRech1.toLowerCase() && itemDate.getFullYear()==this.itemAnnee && d.reception.operationEntree.status=="Traitée";

      }else if((this.inputRech3==null || this.inputRech3==3)&&(this.inputRech!=null || this.inputRech!=12)){

        return client===this.inputRech1.toLowerCase() && itemDate.getMonth()==this.itemDat && d.reception.operationEntree.status=="Traitée";

      }else{
        return client===this.inputRech1.toLowerCase() && itemDate.getMonth()==this.itemDat && itemDate.getFullYear()==this.itemAnnee && d.reception.operationEntree.status=="Traitée";
      }
        //return d.reception.operationEntree.appUser.id==this.inputRech.toLowerCase();
           })
      this.totalConst=(this.resultat).reduce((acc,mots)=>acc +mots.mot,0);
      this.totalPage=(this.resultat).reduce((acc,pages)=>acc +pages.page,0);
      }
      )
  }

  getClientMoi(event: Event,event1:Event){
    const target=event.target as HTMLInputElement;
    const file=target.value
    this.inputRech=file

    const target1=event1.target as HTMLInputElement;
    const file1=target1.value
    this.inputRech1=file1

  this.resultats=this.serviceTraiteTout.getListeTraiteTout();
      this.resultats.subscribe(
        data=>{
      this.resultat= data.filter((d)=>{
       // let itemDate=new Date(d.dateTraitement).getFullYear();
       let itemDate=new Date(d.dateTraitement);
       let client=d.reception.operationEntree.appUser.email
       console.log(itemDate.getMonth());

        return itemDate.getMonth()==this.inputRech.toLowerCase() && client===this.inputRech1.toLowerCase() && d.reception.operationEntree.status=="Traitée";
        //return d.reception.operationEntree.appUser.id==this.inputRech.toLowerCase();
           })
      }
      )
  }
  paginer(){
  this.router.navigate(['/admin/list_tache']);
  }
  getUtilisateur() {
    this.service.getUtilisateur().subscribe({
      next: (data) => {
        this.utilisateur = data
        this.User = this.utilisateur.filter((res: { role: any, id: number }) => {
          return res.role == "BACKOFFICE"
        })
      }
    })
  }

  getB(event:Event){
    const target=event.target as HTMLInputElement;
    const file=target.value
    this.inputRech9=file
    var nb=parseInt(file)
    this.list_encour_BackOffice=0;
  this.result8=this.ListReceptions.getListeRecep();
  this.result8.subscribe(
    dat=>{
      this.result_back8= dat.filter((d)=>{
       // let itemDate=new Date(d.dateTraitement).getFullYear();
      return d.operationEntree.status=='En cours' && d.appUser.id==this.inputRech9.toLowerCase();
      })
      this.list_encour_BackOffice=this.result_back8.length
    })

  this.resultats=this.serviceTraiteTout.getListeTraiteTout();
      this.resultats.subscribe(
        data=>{
      this.result_back7= data.filter((d)=>{
       // let itemDate=new Date(d.dateTraitement).getFullYear();
       let itemDate=d.reception.appUser.id;
      return itemDate==this.inputRech9.toLowerCase() && d.reception.operationEntree.status=="Traitée";
           })

      //ListReceptions:ReceptionService
      //listeReceptionsBack:Array<ListReceptionsBack>

        this.result_back9= data.filter((d)=>{
          // let itemDate=new Date(d.dateTraitement).getFullYear();
          let itemDate=d.reception.appUser.id;
          return itemDate==this.inputRech9.toLowerCase() && d.reception.operationEntree.status=="En Attente";
              })
      this.list_traitee_backOffice=this.result_back7.length
      this.list_validation_backOffice=this.result_back9.length
      }
      )
  }
  }
  ///

 // this.list_validation_backOffice=this.result_back8.length
 // this.list_encour_BackOffice=this.result_back9.length



