import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../model/login.model';
import { UtilisateurService } from '../services/utilisateur.service';
import { UtilisateurAuthService } from '../services/utilisateur-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-back',
  templateUrl: './login-back.component.html',
  styleUrls: ['./login-back.component.scss']
})
export class LoginBackComponent implements OnInit {
  loginForm!: FormGroup
  login!: Login

  constructor(private http:HttpClient ,private fb: FormBuilder, private services: UtilisateurService,
    private authService: UtilisateurAuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control(null,[Validators.required,Validators.email]),
      password: this.fb.control(null,[Validators.required,Validators.maxLength(20),Validators.minLength(4)]),
  })
  }




incorect() {
  Swal.fire(
    {
      text:'Incorect,verifier',
      confirmButtonColor:'',
      showLoaderOnConfirm:true,
      width:'8cm',
      background:'white',
    })
}
pasClient() {
  Swal.fire(
    {
      text:'Vous n avez pas l autorisation',
      confirmButtonColor:'',
      showLoaderOnConfirm:true,
      width:'10cm',
      background:'red',

    })
}
bloque() {
  Swal.fire(
    {
      text:'Conacter admin,Vous etes Bloqué',
      confirmButtonColor:'',
      showLoaderOnConfirm:true,
      width:'10cm',
      background:'red',

    })
}
Deconnecter() {
  Swal.fire(
    {
      text:'Vous etes resté connecté,Contacter Votre Admin',
      confirmButtonColor:'',
      showLoaderOnConfirm:true,
      width:'10cm',
      background:'red',

    })
}
desactiverEtat(id:any){
  //this.desactiverEtat(res.appUser.id)
  const idParse=parseInt(id);
  this.http.get(environment.backEndHost+"/api/v1/modifieretat1/"+idParse).subscribe({
    next:(data)=>{
    }
  })

}
authentification(){
  if (this.loginForm.valid){
    this.login = this.loginForm.value
    this.services.authentification(this.login).subscribe({
      next:(res)=>{
      if(res.appUser.status==1){
                if (res.appUser.role !=='CLIENT'){
                        if(res.appUser.role =='BACfKOfFFICE' && res.appUser.etat==1){
                          this.Deconnecter()
                          }else{
                                this.authService.setRole(res.appUser.role);
                                this.authService.setEmail(res.appUser.email)
                                this.authService.setNom(res.appUser.nom)
                                this.authService.setToken(res.token);
                                this.authService.setIdUser(res.appUser.id)
                                this.desactiverEtat(res.appUser.id)
                                this.route.navigate(['/admin'])

                          }
                }else{
                  this.pasClient();
                }
        }else{
          this.bloque();
        }
      },error:(err)=>{
        this.incorect();
      }
    })

  }else{
    this.incorect();
  }

}

}
function data(value: any): void {
throw new Error('Function not implemented.');
}



