import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  openModal: boolean = false;
  idUser:any=this.usercervice.getIdUser();
  email:any=this.usercervice.getEmail();
  role:any=this.usercervice.getRole();
  nom:any=this.usercervice.getNom();
  constructor(private http:HttpClient,private route:Router,private usercervice:UtilisateurAuthService) { }

  ngOnInit(): void {
  }

  dec(): void {
    localStorage.clear();
    this.desactiverEtat(this.idUser)
    this.route.navigate(['/'])
  }
  desactiverEtat(id:any){
    //this.desactiverEtat(res.appUser.id)
    const idParse=parseInt(id);
    this.http.get(environment.backEndHost+"/api/v1/modifieretat/"+idParse).subscribe({
      next:(data)=>{
      }
    })

  }

  openModaProfil() {
    Swal.fire(
      {
        title:'Deconnexion',
        text:'Voulez vous vraiment deconnecter ?',
        showCancelButton:true,
        confirmButtonText:'Oui',
        cancelButtonText:'Non',
        confirmButtonColor:'green',
        cancelButtonColor:'red',
        width:'10cm',
        background:'white',

      }).then((resultat)=>{
        if(resultat.value){
          this.dec();
        }else if(resultat.dismiss===Swal.DismissReason.cancel){

        }
      })

  }
}
