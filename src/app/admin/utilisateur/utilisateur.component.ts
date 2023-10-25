import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListTraitementTout } from 'src/app/model/ListTraitementTout.model';
import { ListReceptionsBack } from 'src/app/model/listeReceptions.model';
import { ListOperation } from 'src/app/model/listeTache.model';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { ReceptionService } from 'src/app/services/reception/reception.service';
import { TachesService } from 'src/app/services/taches/taches.service';
import { TraitementService } from 'src/app/services/traitement/traitement.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  resultats:Observable<Array<ListTraitementTout>>
  listeReceptionsBack:Array<ListReceptionsBack>
  listeTaches:Array<ListOperation>
  nombre_action_back=0;
  nombre_action_client=0;
  ///|paginate:{itemsPerPage:4,currentPage:page,totalItems:totalLenght}
/*<div class="pagination">
            <pagination-controls (pageChange)="page=$event"></pagination-controls>
        </div>*/
totalLenght:any;
page:number=1;

  formUtilisateur!: FormGroup;
  utilisateur!: Utilisateur
  user!:Observable<Array<Utilisateur>>
  role:any=this.serviceUser.getRole();


      //
  constructor(private router:Router,private serviceUser:UtilisateurAuthService,private serviceTaches:TachesService,private ListesReception:ReceptionService,private services: UtilisateurService,private serviceTraiteTout :TraitementService, private fb: FormBuilder,private http:HttpClient) { }

  ngOnInit(): void {
    if(this.role!='ADMIN'){
      //role:any=this.serviceUser.getRole();
      //private serviceUser:UtilisateurAuthService
      //this.router.navigate(['/']);
      //private router:Router
      this.router.navigate(['/']);
    }else{
    this.formUtilisateur = this.fb.group({
      nom: this.fb.control(null,Validators.required),
      email: this.fb.control(null,[Validators.required,Validators.email]),
      password: this.fb.control(null,[Validators.required,Validators.maxLength(20),Validators.minLength(8)]),
      role: this.fb.control(null,Validators.required),
    })
   // user!: Observable<Array<Utilisateur>>
   //private services: UtilisateurService
    this.user = this.services.listUtilisateur();
  }
  }
  enregitrerUtilisateur() {
    this.utilisateur = this.formUtilisateur.value;

    this.services.enregistrerUtilisateur(this.utilisateur).subscribe(
      { next:(data)=> {
        this.formUtilisateur.reset(0)
        window.location.reload();
      },error:(err)=>{
      }
    }

    );

  }
  getUtilisateur(){
    this.user=this.services.listUtilisateur();
  }
  desactiverCompter(id:any){
    const idParse=parseInt(id);
    this.http.get(environment.backEndHost+"/api/v1/modifierstatus/"+idParse).subscribe({
      next:(data)=>{
        this.getUtilisateur();
      }
    })
    window.location.reload();
  }
  desactiverEtat(id:any){
    const idParse=parseInt(id);
    this.http.get(environment.backEndHost+"/api/v1/modifieretat/"+idParse).subscribe({
      next:(data)=>{
        this.getUtilisateur();
      }
    })
    window.location.reload();
  }
  ///Suppression de user
supUser(id :number,roles :string){
this.serviceTaches.getListeByClient(id).subscribe({
        next:(data)=>{
          //private serviceTaches:TachesService
          this.listeTaches=data;
          this.nombre_action_client=this.listeTaches.length
          this.deleteConfirmation(id,roles)
        }

  })

  this.ListesReception.getListeRecByClient(id).subscribe({
    next:(data)=>{
      //listeReceptionsBack:Array<ListReceptionsBack>
      this.listeReceptionsBack=data.filter((d)=>{
        return d.operationEntree.status=='En cours' && d.appUser.id==id;

      })
    this.nombre_action_back=this.listeReceptionsBack.length
    }
  })
 }


deleteConfirmation(id:number,roles:string){
  Swal.fire(
    {
      title:'Suppresion !',
      text:'Voulez vous continuer?',
      showCancelButton:true,
      confirmButtonText:'Oui',
      cancelButtonText:'Non',
      confirmButtonColor:'red',
      cancelButtonColor:'green',
      width:'10cm',
      background:'white',
    }).then((resultat)=>{
      if(resultat.value){
        if(roles=='CLIENT'){
            if(this.nombre_action_client==0){
              this.supprimerTotalement(id)
              }else{
              this.dejaAction()
              }
        }else if(roles=='BACKOFFICE'){
            if(this.nombre_action_back==0){
              this.supprimerTotalement(id)
            }else{
            this.dejaAction()
            }
        }else{
          this.supprimerTotalement(id)
        }
      }else if(resultat.dismiss===Swal.DismissReason.cancel){
      }
    })
}
dejaAction(){
  Swal.fire(
    {
      title:'On ne peut pas faire !',
      text:'Utulisateur en action?',
      width:'10cm',
      background:'red',
    })
}

supprimerTotalement(id:number){
  this.serviceTraiteTout.suprimmerUser(id).subscribe({
    next:(data)=>{
      window.location.reload();
    },error:(err)=>{
      this.serviceTraiteTout.suprimmerUser(id).subscribe({
        next:(data)=>{
          window.location.reload();
        }
      })
    }
   })

}

}
