import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { Reception } from 'src/app/model/Reception.model';
import { ListOperation } from 'src/app/model/listeTache.model';
import { CreertacheService } from 'src/app/services/taches/creertache.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { threadId } from 'worker_threads';
import { interval } from 'rxjs';

@Component({
  selector: 'app-list-tache',
  templateUrl: './list-tache.component.html',
  styleUrls: ['./list-tache.component.scss']
})
export class ListTacheComponent implements OnInit {
 ///|paginate:{itemsPerPage:4,currentPage:page,totalItems:totalLenght}
/*<div class="pagination">
            <pagination-controls (pageChange)="page=$event"></pagination-controls>
        </div>*/
totalLenght:any;
page:number=1;

  recep: Reception = new Reception();

  list:any
  formOperation!: FormGroup;
  taches: any
  idUser: any=this.serviceUser.getIdUser();
  role:any=this.serviceUser.getRole();
  inputRech?:string
  itemDat:any

  constructor(private router:Router,private http: HttpClient,private service:CreertacheService,private serviceUser:UtilisateurAuthService) {

  }

  ngOnInit(): void {
  interval(1000).subscribe(()=>{//interval

    if(this.role == "BACKOFFICE" || "ADMIN"){
    this.http.get(environment.backEndHost+"/api/v1/list_task").subscribe(
      data => {
        this.taches = data;
      },error =>{
        console.log(error);
      } )
    }else{
      console.log("Desolez  !vous devez sortir,seulement le BackOfiice qui peut diriger por cette lien");
      this.router.navigate(['/']);
    }
    })//Interval
  }
voirmessage( message:string) {
  Swal.fire(
    {
      title:'',
      text:message,
      confirmButtonText:'Ok',
      confirmButtonColor:'white',
      background:'white',
    })
  }

  ConsignerTache(id:number) {
    if(this.role =="ADMIN"){
      alert("Seule BACKOFFICE qui peut diriger")

    }else{
    this.recep.idOperation = id;
    this.recep.idUser=this.idUser;
    console.log(this.recep);
    this.service.receptionTache(this.recep).subscribe(
      data=>console.log(data)
    )
    this.router.navigate(['/admin/reception_taches_back']);
  }
}


}
