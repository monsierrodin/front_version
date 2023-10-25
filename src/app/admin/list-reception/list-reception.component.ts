import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { saveAs } from 'file-saver';
import { type } from 'os';
import { of } from 'rxjs';
import { FileService } from 'src/app/file.service';
import { Reception } from 'src/app/model/Reception.model';
import { Router } from '@angular/router';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import { environment } from 'src/environments/environment';
import { ReceptionService } from 'src/app/services/reception/reception.service';
import { ListReceptionsBack } from 'src/app/model/listeReceptions.model';

@Component({
  selector: 'app-list-reception',
  templateUrl: './list-reception.component.html',
  styleUrls: ['./list-reception.component.scss']
})
export class ListReceptionComponent implements OnInit {
  recep: Reception = new Reception();
  listeReceptionsBack:Array<ListReceptionsBack>

  receptions:any
  filenames: string[]=[];
  fileStatus={status:'', requestType:'uploading ...', percent : 0};
  idUser:any=this.userService.getIdUser();
  role:any=this.userService.getRole();
  page:number=1;
  totalLenght:any;

  constructor(private router:Router,private ListReceptions:ReceptionService,private userService:UtilisateurAuthService,private http: HttpClient, private fileService:FileService,private root:Router) { }

  ngOnInit(): void {
    if(this.role =='ADMIN'){
      //ListReceptions:ReceptionService
      //listeReceptionsBack:Array<ListReceptionsBack>
      this.ListReceptions.getListeRecep().subscribe({
        next:(data)=>{
          this.listeReceptionsBack=data.filter((d)=>{
            return d.operationEntree.status=='En cours';
          })
        //  this.nombre=this.listeReceptionsBack.length
        }

      })
    }else{
      alert("Vous n'avez pas le droit de se dorisger,desolé,vous devez deconneter");
      localStorage.clear();
      this.router.navigate(['/'])

    }

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

  telecha(filename: string,ext:string,nomDoc:string) : void{
    this.fileService.telecharger(filename,ext).subscribe({
      next:(data)=>{
        let blob :Blob = data.body as Blob
        let a=document.createElement('a');
        a.download=nomDoc
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

}
