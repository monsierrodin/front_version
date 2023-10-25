import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/file.service';
import { ListReceptionsBack } from 'src/app/model/listeReceptions.model';
import { ReceptionService } from 'src/app/services/reception/reception.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import { environment } from 'src/environments/environment';7
import { interval } from 'rxjs';

@Component({
  selector: 'app-list-reception-back',
  templateUrl: './list-reception-back.component.html',
  styleUrls: ['./list-reception-back.component.scss']
})
export class ListReceptionBackComponent implements OnInit {
  listeReceptionsBack:Array<ListReceptionsBack>
  idUser:any=this.serviceUser.getIdUser();
  role:any = this.serviceUser.getRole();
  filenames: string[]=[];
  fileStatus={status:'', requestType:'uploading ...', percent : 0};
  inputRech!:string
  nombre=0;

  constructor(private http: HttpClient, private fileService:FileService,private ListReceptions:ReceptionService,private serviceUser:UtilisateurAuthService,private router:Router) { }

  ngOnInit(): void {

    interval(4000).subscribe(()=>{
    if(this.role!="BACKOFFICE"){
      console.log("Desolé,seulement le BackOffice qui peut diriger,vous devez sortir");
      this.router.navigate(['/']);
    }else{
    this.ListReceptions.getListeRecByClient(this.idUser).subscribe({
      next:(data)=>{
        this.listeReceptionsBack=data.filter((d)=>{
          return d.operationEntree.status=='En cours';
        })
        this.nombre=this.listeReceptionsBack.length
      }
    })
  }
})

}

retirerTacheDoc(iddoc:number,ext: string) {
    this.http.get(environment.backEndHost+"/api/v1/teldoc/doc_tache_"+iddoc+ext).subscribe(
      data => {
          console.log(data)
      }
    );
  }
retirerTacheAudio(id:number, ext: string) {
    this.http.get(environment.backEndHost+"/api/v1/tel/audio_tache_"+id+ext).subscribe(
      data => {
          console.log(data)
      }
    );
  }

telechaAudio(id: number,ext:string,nomAud:string) : void{
    this.fileService.telecharAudio(id,ext).subscribe({
      next:(data)=>{
        let blob :Blob = data.body as Blob
        let a=document.createElement('a');
        a.download=nomAud
        a.href=window.URL.createObjectURL(blob);
        a.click();
      }
    });
  }
telecha(filename: string,ext:string,nomDo:string) : void{
    this.fileService.telecharger(filename,ext).subscribe({
      next:(data)=>{
        let blob :Blob = data.body as Blob
        let a=document.createElement('a');
        a.download=nomDo
        a.href=window.URL.createObjectURL(blob);
        a.click();
      }
    });
  }
rendre(id :number){
    this.router.navigateByUrl("/admin/traitement_tache/"+id)
  }
chercherReception(event: Event){
  ///(keyup)="chercherReception($event)
    const target=event.target as HTMLInputElement;
    const file=target.value
    this.inputRech=file
    this.ListReceptions.getListeRecByClient(this.idUser).subscribe({
      next:(data)=>{
        if(this.inputRech){
          this.listeReceptionsBack=data.filter(re=>re.operationEntree.codeTache.toLowerCase().includes(this.inputRech.toLowerCase()) )
        }else this.listeReceptionsBack=data;

      }
    })
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

}



