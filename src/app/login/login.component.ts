import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { Login } from '../model/login.model';
import { UtilisateurService } from '../services/utilisateur.service';
import { UtilisateurAuthService } from '../services/utilisateur-auth.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  login!: Login

  constructor(private http:HttpClient,private fb: FormBuilder, private services: UtilisateurService,
    private authService: UtilisateurAuthService,
    private route: Router) { }

    //Validators.required, Validators.pattern (' (?=.* [a-z]) (?=.* [A-Z]) (?=.* [0-9]) (?=.* [$@$!%*?&]) [A-Za-z\d$@$!%*?&]. {8,}') ] ]
    //null, [ (c: AbstractControl) => Validators.required(c), Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})'), ]

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control(null,[Validators.required,Validators.email]),
      password: this.fb.control(null,[Validators.required,Validators.maxLength(20),Validators.minLength(4)]),
  })
  }

  pasClient() {
    Swal.fire(
      {
        text:'Vous n etes pas client',
        confirmButtonColor:'',
        showLoaderOnConfirm:true,
        width:'10cm',
        background:'red',

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
                  if (res.appUser.role=='CLIENT'){
                    this.authService.setRole(res.appUser.role);
                    this.authService.setEmail(res.appUser.email)
                    this.authService.setNom(res.appUser.nom)
                    this.authService.setToken(res.token);
                    this.authService.setIdUser(res.appUser.id)
                    this.desactiverEtat(res.appUser.id)
                    this.route.navigate(['/admin/your_liste_traitement'])
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

