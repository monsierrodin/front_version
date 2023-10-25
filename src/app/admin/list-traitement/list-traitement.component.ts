import { HttpClient , HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/file.service';
import { ListTraitementTout } from 'src/app/model/ListTraitementTout.model';
import { RecepClient } from 'src/app/model/Resultat';
import { TraitementService } from 'src/app/services/traitement/traitement.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import Swal from 'sweetalert2';
import { interval } from 'rxjs';

@Component({
  selector: 'app-list-traitement',
  templateUrl: './list-traitement.component.html',
  styleUrls: ['./list-traitement.component.scss']
})
export class ListTraitementComponent implements OnInit {
  test:RecepClient=new RecepClient


  ///|paginate:{itemsPerPage:4,currentPage:page,totalItems:totalLenght}
/*<div class="pagination">
            <pagination-controls (pageChange)="page=$event"></pagination-controls>
        </div>*/
totalPageItems:any;
page:number=1;
data_nombre=0;

  filenames: string[]=[];
  hide:boolean=false
  mess!:string
  fileStatus={status:'', requestType:'uploading ...', percent : 0};
  idUser:any=this.userService.getIdUser();
  role:any=this.userService.getRole();
  resultats:Observable<Array<ListTraitementTout>>
  resultat:any
  inputRech?:string


  constructor(private serviceTraiteTout:TraitementService,private userService:UtilisateurAuthService,private http:HttpClient,private fileService:FileService,private root:Router) { }

  ngOnInit(): void {
    interval(4000).subscribe(()=>{
    this.resultats=this.serviceTraiteTout.getListeTraiteTout();
    if(this.role=="BACKOFFICE"){
      this.resultats.subscribe(
        data=>{
      this.resultat= data.filter((d)=>{
          return d.reception.appUser.id==this.idUser;
        })
        this.data_nombre=this.resultat.length
      }
      )
    }else if(this.role=="ADMIN"){
      this.resultats.subscribe(
        data=>{
          this.resultat= data.filter((d)=>{
            return data && d.reception.operationEntree.status=='En Attente' ;
          })
          this.data_nombre=this.resultat.length
      }
      )
    }else{
    this.resultats.subscribe(
        data=>{
    this.resultat= data.filter((d)=>{
          return d.reception.operationEntree.appUser.id==this.idUser;
        })
        this.data_nombre=this.resultat.length
      }
      )
    }
  })///Interval
  }
  modifier(id:number){
    this.root.navigateByUrl("/admin/update_Traitement/"+id)
  }
  chercherReception(event: Event){
    const target=event.target as HTMLInputElement;
    const file=target.value
    this.inputRech=file
    this.serviceTraiteTout.getListeTraiteTout().subscribe({
      next:(data)=>{
        if(this.inputRech){
          this.resultat=data.filter(re=>re.reception.operationEntree.codeTache.toLowerCase().includes(this.inputRech.toLowerCase()) )
        }else this.resultat=data;
      }
    })
}

  voirmessage( message:string) {
    Swal.fire(
      {
        title:'',
        text:message,
        confirmButtonText:'Ok',
        confirmButtonColor:'white',
        width:'10cm',
        background:'white',
      })
  }
  //// telechargement
  telechargerTraitement(filename: number,ext:string,nomReelDoc:string) : void{
    this.fileService.telechar_traite(filename,ext).subscribe({
        next:(data)=>{
          let blob :Blob = data.body as Blob
          let a=document.createElement('a');
          a.download=nomReelDoc
          a.href=window.URL.createObjectURL(blob);
          a.click();
        }

      });
  }
  rendre(id :number){
    this.root.navigateByUrl("/admin/traitement_tache/"+id)
  }
private resportProgress(httpEvent: HttpEvent<string[] | Blob>):void {
    switch(httpEvent.type){
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded,httpEvent.total!,"Insertion");
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded,httpEvent.total!,"telechargement");
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header Returned',httpEvent);
        break;
      case HttpEventType.Response:
        if(httpEvent.body instanceof  Array ){
          for(const filename of httpEvent.body){
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                {type:`${httpEvent.headers.get('Content-type')};charset=utf-8`}
                ));
        }
        this.fileStatus.status='done';
        break;
        default:
          console.log(httpEvent);
          break;

    }
  }
private updateStatus(loaded: number, total: number , requestType: string) {
    this.fileStatus.status='progress';
    this.fileStatus.requestType= requestType;
    this.fileStatus.percent= Math.round(100*loaded/total);
  }
  testv(){
    Swal.fire(
      {
        title:'title',
        text:'test',
        showCancelButton:true,
        confirmButtonText:'oui',
        cancelButtonText:'non'

      }).then((resultat)=>{
        if(resultat.value){
          Swal.fire(
            'Deleded!',
            'test',
            'success'
          )
        }else if(resultat.dismiss===Swal.DismissReason.cancel){
          Swal.fire(
            'Canceled','You:)','error'
          )
        }
      })
  }

supremerTraitement(id:number) {
    Swal.fire(
      {
        title:'Suppression',
        text:'Voulez vous vraiment continuer ?',
        showCancelButton:true,
        confirmButtonText:'Oui',
        cancelButtonText:'Non',
        confirmButtonColor:'red',
        cancelButtonColor:'green',
        width:'10cm',
        background:'white',
      }).then((resultat)=>{
        if(resultat.value){
          //private serviceTraiteTout:TraitementService
          this.serviceTraiteTout.suprimmerTraitement(id).subscribe({
            next:(data)=>{
              console.log(data);
              window.location.reload();
            }
           })

        }else if(resultat.dismiss===Swal.DismissReason.cancel){

        }
      })
  }
RefuserTraitement(id:number) {
    Swal.fire(
      {
        title:'Confirmation!',
        text:'Voulez vous vraiment le refuser de traitement?',
        showCancelButton:true,
        confirmButtonText:'Oui',
        cancelButtonText:'Non',
        confirmButtonColor:'red',
        cancelButtonColor:'green',
        width:'8cm',
        background:'white',
      }).then((resultat)=>{
        if(resultat.value){
          this.serviceTraiteTout.suprimmerTraitement(id).subscribe({
            next:(data)=>{
              console.log(data);
            }
           })
        }else if(resultat.dismiss===Swal.DismissReason.cancel){
        }
      })
  }
  validerTraitement(id:number) {
    Swal.fire(
      {
        title:'Confirmation!',
        text:'Voulez vous vraiment le accepter ?',
        showCancelButton:true,
        confirmButtonText:'Oui',
        cancelButtonText:'Non',
        confirmButtonColor:'red',
        cancelButtonColor:'green',
        width:'10cm',
        background:'white',
      }).then((resultat)=>{
        if(resultat.value){
          this.serviceTraiteTout.validerTraitement(id).subscribe({
            next:(data)=>{
              console.log(data);
            }
           })
        }else if(resultat.dismiss===Swal.DismissReason.cancel){
        }
      })
  }

  telechaAudio(id: number,ext:string,nomReel:string) : void{
    this.fileService.telecharAudio(id,ext).subscribe({
      next:(data)=>{
        let blob :Blob = data.body as Blob
        let a=document.createElement('a');
        a.download=nomReel
        a.href=window.URL.createObjectURL(blob);
        a.click();
      }
    });
  }

}
