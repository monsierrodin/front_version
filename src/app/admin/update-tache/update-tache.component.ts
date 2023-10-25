import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/file.service';
import { OperationEntre } from 'src/app/model/operationEntre.model';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-tache',
  templateUrl: './update-tache.component.html',
  styleUrls: ['./update-tache.component.scss']
})
export class UpdateTacheComponent implements OnInit {
  role:any=this.userService.getRole();
  operationEntre: OperationEntre = new OperationEntre();

  formOperation!: FormGroup;
  public fileOperationDoc: any = File;
  public fileOperationAudio: any = File;
  public fileName: any = File.name;
  public fileName2: any = File.name;
  id?:number
  receptions?:any
  d=this.ac.snapshot.paramMap.get('id');
  rr:any


  constructor(private service:FileService,private fb:FormBuilder,private ac:ActivatedRoute, private http:HttpClient,private userService:UtilisateurAuthService,private router:Router) {}
  ngOnInit(): void {
    if(this.role!='CLIENT'){
     alert("vous n'etes pas Client,vous devez deconncter");
     localStorage.clear();
     this.router.navigate(['/']);
    }else{
     this.rr= this.service.getTache(parseInt(this.d))
     console.log(this.rr)

       this.formOperation = this.fb.group({

        description: this.fb.control(this.role,[Validators.required,Validators.minLength(10)]),
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
 updateTache() {
   Swal.fire(
     {
       title:'! Confirmation !',
       text:'Voulez vous vraiment modifier ?',
       showCancelButton:true,
       confirmButtonText:'oui',
       cancelButtonText:'non',
       confirmButtonColor:'green',
       cancelButtonColor:'red',
       width:'10cm',
       background:'white',

     }).then((resultat)=>{
       if(resultat.value){
         this.update();
         Swal.fire(
           {
             text:'Mofifiée',
             confirmButtonText:'ok',
             width:'6cm',
             background:'green',
           }
         )
       }else if(resultat.dismiss===Swal.DismissReason.cancel){

       }
     })

 }
  update(){
    this.operationEntre = this.formOperation.value;
    const formData = new FormData();
    const formData1 = new FormData();
    formData.append("files", this.fileOperationDoc, this.fileName);
    formData1.append("files", this.fileOperationAudio, this.fileName2);
    this.http.post(environment.backEndHost+"/api/v1/updateTask/"+this.d, this.operationEntre).subscribe(
      data => {
        this.http.post(environment.backEndHost+"/api/v1/createFile/ "+data, formData).subscribe(
          data => console.log(data)
        )
        this.http.post(environment.backEndHost+"/api/v1/createFile/"+data, formData1).subscribe(
          data => console.log(data)
        )
        this.router.navigate(['admin/taches_client']);
      }

    );


  }

}
