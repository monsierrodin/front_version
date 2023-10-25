import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecepClient } from 'src/app/model/Resultat';
import { TraitementResult } from 'src/app/model/operationEntre.model copy';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-traitement',
  templateUrl: './update-traitement.component.html',
  styleUrls: ['./update-traitement.component.scss']
})
export class UpdateTraitementComponent implements OnInit {
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
    this.formTraitement = this.fb.group({
      mot:this.fb.control(null,[Validators.required,Validators.maxLength(11)]),
      page:this.fb.control(null,[Validators.required,Validators.maxLength(7)]),
    })
  }
  modTraitement() {
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
          this.UpdateTraitement();
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
  UpdateTraitement() {
    this.traitement = this.formTraitement.value;
    this.traitement.idReception =parseInt(this.d);
    this.http.post(environment.backEndHost+"/api/v1/updateTraitement/"+this.d, this.traitement).subscribe(
      data => {
        this.root.navigate(['/admin/your_liste_traitement']) 
       } );
      }
}
