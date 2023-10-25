import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({providedIn: 'root'})
export class FileService {
  private server=environment.backEndHost;
  

  constructor(private http: HttpClient) { }

telecharger(filename: string,ext :string) : Observable<any>{
    return this.http.get(environment.backEndHost+"/api/v1/teldoc/doc_tache_"+filename+ext,{
      reportProgress:true,
      observe:'events',
      responseType: 'blob'
 });
}
telecharAudio(id: number,ext :string) : Observable<any>{
console.log("gf"+ext)
if(ext=='.DS2' || ext=='.dss' || ext=='.dss2'|| ext=='.ds2' || ext=='.DSS' || ext=='.DSS2'){
    return this.http.get(environment.backEndHost+"/api/v1/tel1/audio_tache_"+id+ext,{
    reportProgress:true,
    observe:'events',
    responseType: 'blob'
});
}else {
  return this.http.get(environment.backEndHost+"/api/v1/tel/audio_tache_"+id+ext,{
    reportProgress:true,
    observe:'events',
    responseType: 'blob'
});
}
  
}

  telechar_traite(filename: number,ext :string) : Observable<any>{
    return this.http.get(environment.backEndHost+"/api/v1/teldoc_traite/doc_tache_taite_"+filename+ext,{
      reportProgress:true,
      observe:'events',
      responseType: 'blob'
 });
  }
  getTache(id:number){
    return this.http.get(environment.backEndHost+"/api/v1/getIdOperation/"+id)
  }
}
