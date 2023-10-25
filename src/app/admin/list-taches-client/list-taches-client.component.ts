import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListOperation } from 'src/app/model/listeTache.model';
import { TachesService } from 'src/app/services/taches/taches.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import Swal from 'sweetalert2';
import { interval } from 'rxjs';

@Component({
  selector: 'app-list-taches-client',
  templateUrl: './list-taches-client.component.html',
  styleUrls: ['./list-taches-client.component.scss']
})
export class ListTachesClientComponent implements OnInit {
  listeTaches:Array<ListOperation>
  idUser:any=this.serviceUser.getIdUser();
  role:any = this.serviceUser.getRole();
  searchFormGroup:FormGroup;
  inputRech!:string
  inputDate!:Date
  message:any


  ///|paginate:{itemsPerPage:4,currentPage:page,totalItems:totalLenght}
/*<div class="pagination">
            <pagination-controls (pageChange)="page=$event"></pagination-controls>
        </div>*/
totalLenght:any;
page:number=1;
  constructor(private root:Router,private fb:FormBuilder, private serviceTaches:TachesService,private serviceUser:UtilisateurAuthService,private router:Router) { }

  ngOnInit(): void {
    interval(1000).subscribe(()=>{
    if(this.role != "CLIENT" ){
      console.log("Vous devez sortir ,vous n'etes pas client");
      this.router.navigate(['/']);
    }else{
      this.serviceTaches.getListeByClient(this.idUser).subscribe({
        next:(data)=>{
          this.listeTaches=data;
        }
      })
    }
  })
  }
  chercherTaches(event: Event){
    const target=event.target as HTMLInputElement;
    const file=target.value
    this.inputRech=file
    this.serviceTaches.getListeByClient(this.idUser).subscribe({
      next:(data)=>{
        if(this.inputRech){
          this.listeTaches=data.filter(re=>re.description.includes(this.inputRech) || re.codeTache.includes(this.inputRech))
        }else this.listeTaches=data;

      }
    })
  }
  modifierTache(id:number){
    this.router.navigateByUrl("/admin/update_Tache_client/"+id)
  }
  sup(id:number){
    this.serviceTaches.suprimmerTache(id).subscribe({
      next:(data)=>{
        this.message=data;
        this.messageSupression(this.message.message);
        window.location.reload();
      }

    })
  }
 messageSupression(mes:string) {
    Swal.fire(
      {
        titleText:'Suppression',
        text:mes,
        confirmButtonText:'Oui',
        confirmButtonColor:'black',
        width:'6cm',
        background:'red-dark',
      })

  }
  supresssionTache(id:number) {
    Swal.fire(
      {
        title:'Supression de Tache'+id,
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
          this.sup(id);

        }else if(resultat.dismiss===Swal.DismissReason.cancel){

        }
      })
  }
}




