import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { error } from 'console';
import { validate } from 'json-schema';
import { Observable, window } from 'rxjs';
import { OperationEntre } from 'src/app/model/operationEntre.model';
import { CreertacheService } from 'src/app/services/taches/creertache.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-creertache',
  templateUrl: './creertache.component.html',
  styleUrls: ['./creertache.component.scss']
})
export class CreertacheComponent implements OnInit {
  operationEntre: OperationEntre = new OperationEntre();
  idUser:any=this.serviceUser.getIdUser();
  role:any=this.serviceUser.getRole();

  formOperation!: FormGroup;
  public fileOperationDoc: any = File;
  public fileOperationAudio: any = File;
  public fileName: any = File.name;
  public fileName2: any = File.name;

  taches :any;

  constructor(private router:Router,private servicesTache: CreertacheService, private fb: FormBuilder, private http: HttpClient,private serviceUser:UtilisateurAuthService) { }

  ngOnInit(): void {
     if(this.role!='CLIENT'){
      //role:any=this.serviceUser.getRole();
      //private serviceUser:UtilisateurAuthService
      //this.router.navigate(['/']);
      //private router:Router
      alert("vous n'etes pas Client,vous devez deconncter");
      localStorage.clear();
      this.router.navigate(['/']);
     }else{
      this.formOperation = this.fb.group({
        description: this.fb.control(null,[Validators.required,Validators.minLength(10)]),
        priority: this.fb.control(null,[Validators.required]),
        fichier1:this.fb.control(null,[Validators.required]),
        fichier2:this.fb.control(null,[Validators.required]),
        idUser: this.fb.control(""),
      })
     }

  }
  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileOperationDoc = file[0];
    this.fileName = file[0].name
    console.log(this.fileOperationDoc)

  }
  onSelectFileAudio(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileOperationAudio = file[0];
    this.fileName2 = file[0].name
    console.log(this.fileOperationAudio)
  }
  ajouterTache() {
    Swal.fire(
      {
        title:'! Confirmation !',
        text:'Voulez vous vraiment continuer ?',
        showCancelButton:true,
        confirmButtonText:'oui',
        cancelButtonText:'non',
        confirmButtonColor:'green',
        cancelButtonColor:'red',
        width:'10cm',
        background:'white',

      }).then((resultat)=>{
        if(resultat.value){
          this.create();
          Swal.fire(
            {
              text:'Votre action est succèe',
              confirmButtonText:'ok',
              width:'5cm',
              background:'green',
            }
          )
        }else if(resultat.dismiss===Swal.DismissReason.cancel){
        }
      })

  }

  create(){
    this.operationEntre = this.formOperation.value;
    this.operationEntre.id = 1;
    this.operationEntre.dateOperation= new Date()
    this.operationEntre.idUser = this.idUser;
    this.operationEntre.nomDocument=this.fileName;
    this.operationEntre.nomAudio=this.fileName2
    const formData = new FormData();
    const formData1 = new FormData();
    formData.append("files", this.fileOperationDoc, this.fileName);
    formData1.append("files", this.fileOperationAudio, this.fileName2);
    this.http.post(environment.backEndHost+"/api/v1/createTask", this.operationEntre).subscribe(
      data => {

        this.http.post(environment.backEndHost+"/api/v1/createFile/ "+data, formData).subscribe({
          next:(data)=> {
            this.http.post(environment.backEndHost+"/api/v1/createFileAudio/"+data, formData1).subscribe(
              data => console.log(data)
            )
          },error:(err)=> {
            this.http.post(environment.backEndHost+"/api/v1/createFileAudio/"+data, formData1).subscribe(
              data => console.log(data)
            )
          }
      })
        this.router.navigate(['admin/taches_client']);
      }

    );


  }




}
