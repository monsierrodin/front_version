import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/file.service';
import { ListTacheTout, ListTraitementTout } from 'src/app/model/ListTraitementTout.model';
import { RecepClient } from 'src/app/model/Resultat';
import { TraitementService } from 'src/app/services/traitement/traitement.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

        fileName='facture.xlsx'
        totalLenght:any;
        page:number=1;

        hideRow:true
        result_back:any
        result_back1:any
        result_back2:any
        list_traitee_back=0
        list_validation_back=0
        list_encours_back=0
        montant=0;
        type_nombre=3;

        filenames: string[]=[];
        hide:boolean=false
        mess!:string
        fileStatus={status:'', requestType:'uploading ...', percent : 0};
        idUser:any=this.userService.getIdUser();
        role:any=this.userService.getRole();
        resultats:Observable<Array<ListTraitementTout>>
        tacheTout:Observable<Array<ListTacheTout>>
        resultat:any
        result:any
        inputRech?:any
        inputRech1?:any
        list_validation=0;
        list_tout=0;
        totalDuree=0;
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

        years = Array.from({length: 146}, (_, i) => 2022 + i);

        constructor(private serviceTraiteTout:TraitementService,private userService:UtilisateurAuthService,private http:HttpClient,private fileService:FileService,private root:Router) { }

        ngOnInit(): void {
          if(this.role=='ADMIN' || this.role=='BACKOFFICE' || this.role=='CLIENT'){
            //role:any=this.serviceUser.getRole();
            //private serviceUser:UtilisateurAuthService
            //this.router.navigate(['/']);
            //private router:Router
            this.getStat();
          }else{
          this.root.navigate(['/']);

        }
        }
        getStat(){
          this.resultats=this.serviceTraiteTout.getListeTraiteTout();
          if(this.role=="BACKOFFICE"){
            console.log("vous n'etes pas autorisé")

          }else if(this.role=="ADMIN"){
            this.resultats.subscribe(
              data=>{
                this.resultat= data.filter((d)=>{
                  return d.reception.operationEntree.status=='Traitée';
                   })
            }
            )
          }

      this.filtreTache();
      this.listTout();

        }
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
      }


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
              //Rodin andriamalaza 0347144597
            this.resultat= data.filter((d)=>{
             // let itemDate=new Date(d.dateTraitement).getFullYear();
             let itemDate=new Date(d.dateTraitement);
             console.log(this.itemAnnee)
              if((this.inputRech==12||this.inputRech==null) && (this.inputRech3==3||this.inputRech3==null)){

                return data;
              }else if((this.inputRech!=12||this.inputRech!=null) && (this.inputRech3==3||this.inputRech3==null)){
                return itemDate.getMonth()==this.inputRech.toLowerCase() && d.reception.operationEntree.status=='Traitée';
              }else if((this.inputRech==12||this.inputRech==null) && (this.inputRech3!=3||this.inputRech3!=null)){
                return itemDate.getFullYear()==this.inputRech3.toLowerCase() && d.reception.operationEntree.status=='Traitée';
              }else if((this.inputRech!=12||this.inputRech!=null) && (this.inputRech3!=3||this.inputRech3!=null)){
                  return itemDate.getFullYear()==this.inputRech3.toLowerCase()&&itemDate.getMonth()==this.inputRech.toLowerCase();
              } else{
                return itemDate.getFullYear()==this.inputRech3.toLowerCase() && d.reception.operationEntree.status=='Traitée';
              }

                 })
            this.totalDuree=(this.resultat).reduce((acc,duree)=>acc +duree.duree,0);
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
                return data && d.reception.operationEntree.status=='Traitée';
              }else if(this.inputRech==12 &&(this.inputRech3!=3||this.inputRech3!=null)){
                return itemDate.getFullYear()==this.itemAnnee && d.reception.operationEntree.status=='Traitée';
              }else if(this.inputRech!=12 &&(this.inputRech3==3||this.inputRech3==null)){
                return itemDate.getMonth()==this.itemDat && d.reception.operationEntree.status=='Traitée';
              }else{
                return itemDate.getMonth()==this.inputRech.toLowerCase() && itemDate.getFullYear()==this.itemAnnee && d.reception.operationEntree.status=='Traitée';
              }
              //return d.reception.operationEntree.appUser.id==this.inputRech.toLowerCase();
                 })
            this.totalConst=(this.resultat).reduce((acc,mots)=>acc +mots.mot,0);
            this.totalPage=(this.resultat).reduce((acc,pages)=>acc +pages.page,0);
            this.totalDuree=(this.resultat).reduce((acc,duree)=>acc +duree.duree,0);
            }
            )
        }
        getClient(event: Event){
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

              return client===this.inputRech1.toLowerCase() && d.reception.operationEntree.status=='Traitée';
            }else if((this.inputRech3!=null || this.inputRech3!=3)&&(this.inputRech==null || this.inputRech==12)){

              return client===this.inputRech1.toLowerCase() && itemDate.getFullYear()==this.itemAnnee && d.reception.operationEntree.status=='Traitée';

            }else if((this.inputRech3==null || this.inputRech3==3)&&(this.inputRech!=null || this.inputRech!=12)){

              return client===this.inputRech1.toLowerCase() && itemDate.getMonth()==this.itemDat && d.reception.operationEntree.status=='Traitée';

            }else{
              return client===this.inputRech1.toLowerCase() && itemDate.getMonth()==this.itemDat && itemDate.getFullYear()==this.itemAnnee && d.reception.operationEntree.status=='Traitée';
            }

                 })
            this.totalConst=(this.resultat).reduce((acc,mots)=>acc +mots.mot,0);
            this.totalPage=(this.resultat).reduce((acc,pages)=>acc +pages.page,0);
            this.totalDuree=(this.resultat).reduce((acc,duree)=>acc +duree.duree,0);
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

              return itemDate.getMonth()==this.inputRech.toLowerCase() && client===this.inputRech1.toLowerCase() && d.reception.operationEntree.status=='Traitée';
              //return d.reception.operationEntree.appUser.id==this.inputRech.toLowerCase();
                 })
            }
            )
        }

 calculer(event :Event){
  const target=event.target as HTMLInputElement;
          const file=target.value
          this.inputRech3=file
  var nb=parseInt(file)

  if(this.type_nombre==3){
    this.montant=nb*this.totalConst
  }else if(this.type_nombre==1){
    this.montant=nb*this.totalDuree
  }else{
    this.montant=nb*this.totalPage
  }

    return this.montant;
        }
  type(event :Event){//(change)="type($event)
    const target=event.target as HTMLInputElement;
          const file=target.value
          this.inputRech3=file
          var nombre=parseInt(file)
          this.type_nombre=nombre
        return this.type_nombre;
  }
  exporter():void{
    //
    let element=document.getElementById('excel-export') ;
    const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,this.fileName);
   }

   ///Bloquer les type caracteres sauf les chiffres
   onKeyPress(event: any) {
    //(keypress)="onKeyPress($event)"
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}



