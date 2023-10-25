import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RecepClient } from 'src/app/model/Resultat';
import { TraitementResult } from 'src/app/model/operationEntre.model copy';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.scss']
})
export class TraitementComponent implements OnInit {
  formTraitement!: FormGroup;
  public fileOperationDoc: any = File;
  public fileName: any = File.name;

  fd:RecepClient=new RecepClient
  traitement:TraitementResult=new TraitementResult
  receptions:any
  id!:number

  constructor(private root:Router ,private ac:ActivatedRoute,private http: HttpClient,private fb: FormBuilder) { }
  d=this.ac.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.http.get(environment.backEndHost+"/api/v1/getIdReception/"+this.d).subscribe(
      data => {
         this.receptions = data;

       },error =>{
         console.log(error);
     })
    this.formTraitement = this.fb.group({
      message: this.fb.control(null,[Validators.required,Validators.minLength(1)]),
      duree:this.fb.control(null,[Validators.required]),
      fichier1:this.fb.control(null,[Validators.required]),

    })

  }
  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileOperationDoc = file[0];
    this.fileName = file[0].name
    console.log(this.fileOperationDoc)

  }

  ajouterTraitement() {
    this.traitement = this.formTraitement.value;
    this.traitement.idReception =parseInt(this.d);
    const formData = new FormData();
    formData.append("files", this.fileOperationDoc, this.fileName);
    this.http.post(environment.backEndHost+"/api/v1/envoieTraitement", this.traitement).subscribe(
      data => {
        this.http.post(environment.backEndHost+"/api/v1/saveTraitement/ "+data, formData).subscribe(
          data => console.log(data)
        )
        this.root.navigate(['/admin/your_liste_traitement'])
       } );

      }
}
