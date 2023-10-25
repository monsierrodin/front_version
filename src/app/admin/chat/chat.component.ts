import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/model/Chat.model';
import { ListReceptionsBack } from 'src/app/model/listeReceptions.model';
import { message } from 'src/app/model/message.model';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { environment } from 'src/environments/environment';
import { interval } from 'rxjs';
import { messageGroupe } from 'src/app/model/messageGroupe.model';
import { GroupMess } from 'src/app/model/GroupMess.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messageChat: message=new message();
  messageGroupChat: messageGroupe=new messageGroupe();
  idUser:any=this.serviceUser.getIdUser();
  nomAdmin:any=this.serviceUser.getNom();
  role:any=this.serviceUser.getRole();
  e

  user:Array<Utilisateur>
  resultats:Observable<Array<Utilisateur>>
  mes:Array<Chat>
  testExist=0;
  messGroup:Array<GroupMess>

  messGroup2:Array<GroupMess>
  messGroup3:Array<GroupMess>
  messGroup4:Array<GroupMess>
  messGroup5:Array<GroupMess>
  groupeMessage:Array<GroupMess>
  IdDestination=0;
  formMessage!: FormGroup;
  formMessageGroupe!:FormGroup;
  formMessGroup!:FormGroup;
  nomUser="Destination";
  nomGroup="";
  IdInvite=0;
  inputRech1?:any
  inputRech?:any
  showLabel=true;
  resultat:any
  grupNombre=0;
 
 

  constructor(private serviceUser:UtilisateurAuthService,private services: UtilisateurService,private fb:FormBuilder,private http :HttpClient) { }

  ngOnInit(): void {
   //
   this.listGroup2();
   this.listGroup3();
    this.services.listUtilisateur().subscribe({
    next:(data)=>{
      //listeReceptionsBack:Array<ListReceptionsBack>
      this.user=data.filter((d)=>{
        return d.role !='CLIENT' && d.id!=this.idUser ;
        
      })
    }
  });
  //formMessGroup
  this.formMessGroup = this.fb.group({
    message: this.fb.control(null,[Validators.required,Validators.minLength(1)]),

  })
  this.formMessageGroupe = this.fb.group({
    groupe: this.fb.control(null,[Validators.required,Validators.minLength(5)]),

  })
  this.formMessage = this.fb.group({
    message: this.fb.control(null,[Validators.required,Validators.minLength(1)]),
  })
  

  interval(2000).subscribe(()=>{
    if(this.IdDestination!=0){
      this.listMessag(this.IdDestination)
    }
    
  })
  interval(2000).subscribe(()=>{
    if(this.IdDestination==99999 && this.nomGroup!='Selectionnner la destinatio de message'){
      this.listMessag2(this.nomGroup)
    }
    
  })
  }
clearInput() {
    this.formMessage.reset();
    this.formMessageGroupe.reset();
    this.formMessGroup.reset();
}
destinationId(id:number,nom:string){
  
    this.IdDestination=id;
    this.nomUser=nom;
  this.listMessag(id);

    }
destinationGroup(group:string){
  
  this.IdDestination=99999;
  this.nomGroup=group;
  this.listMessag2(group);

}
listMessag2(gro:string){
  this.services.listGroup().subscribe({
    next:(data)=>{
      //listeReceptionsBack:Array<ListReceptionsBack>
      this.groupeMessage=data.filter((d)=>{
        return d.groupe==gro && d.message!="%%uib30u_9uuuimess2023arosaina%%" && d.message!="%%uib30u_9uuuimess2023arosaina_inv%%";
        
      })
    }
  })
}
//createMessGroupe
createMessGroupe(){
  if(this.IdDestination==99999){
    this.messageGroupChat = this.formMessGroup.value;
    this.messageGroupChat.groupe =this.nomGroup;
    this.messageGroupChat.userInit = this.idUser;
    this.http.post(environment.backEndHost+"/api/v1/createMessageGroup", this.messageGroupChat).subscribe(
      data => { 
      }
    );
    this.clearInput();
  }else{
    alert("Votre Groupe")
  }
  }
create(){
    if(this.IdDestination!=0){
      this.messageChat = this.formMessage.value;
      this.messageChat.userDest = this.IdDestination;
      this.messageChat.userInit = this.idUser;
      this.http.post(environment.backEndHost+"/api/v1/createMessage", this.messageChat).subscribe(
        data => { 
        }
      );
      this.clearInput();
    }else{
      alert("Selectionnner la destinatio de message")
    }
    }

listMessag(idDest:number){
    this.services.listMessage().subscribe({
      next:(data)=>{
        //listeReceptionsBack:Array<ListReceptionsBack>
        this.mes=data.filter((d)=>{
          return (d.userDest==idDest && d.userInit==this.idUser) || (d.userDest==this.idUser && d.userInit==idDest);
          
        })
      }
    })
}
listGroup(){
  this.services.listGroup().subscribe({
    next:(data)=>{
      //listeReceptionsBack:Array<ListReceptionsBack>
      this.messGroup=data.filter((d)=>{
        return d.message== "%%uib30u_9uuuimess2023arosaina%%" ;
        
      })

    }
  })
}
listGroup2(){
  this.services.listGroup().subscribe({
    next:(data)=>{
      //listeReceptionsBack:Array<ListReceptionsBack>
      this.messGroup2=data.filter((d)=>{
        return d.message=="%%uib30u_9uuuimess2023arosaina_inv%%" && d.userInit==this.idUser ;
        
      })

    }
  })
}
listGroup3(){
  this.services.listGroup().subscribe({
    next:(data)=>{
      //listeReceptionsBack:Array<ListReceptionsBack>
      this.messGroup3=data.filter((d)=>{
        return d.message=="%%uib30u_9uuuimess2023arosaina%%" && d.userInit==this.idUser ;
        
      })

    }
  })
}
  ////Creation du group 
creerGroup(){
  this.IdDestination=99999;
  this.nomGroup="Creation du groupe de discussion" 
  this.listGroup();
}
/// Creation Message Group
createMessageGroupe(){
  if(this.grupNombre==0){
    this.messageGroupChat = this.formMessageGroupe.value;
    this.messageGroupChat.message="%%uib30u_9uuuimess2023arosaina%%" 
    this.messageGroupChat.userInit = this.idUser;
    this.http.post(environment.backEndHost+"/api/v1/createMessageGroup", this.messageGroupChat).subscribe(
      data => { 
      }
    );
    alert("success");
    this.clearInput();
  }else{
  this.existe();
  }
  }

InviterMessageGroupe(group:string){
 
    this.messageGroupChat = this.formMessageGroupe.value;
    this.messageGroupChat.groupe=group
    this.messageGroupChat.message="%%uib30u_9uuuimess2023arosaina_inv%%" 
    this.messageGroupChat.userInit = this.IdInvite;
    this.http.post(environment.backEndHost+"/api/v1/createMessageGroup", this.messageGroupChat).subscribe(
      data => { 
      }
      
    );  
  alert("succes");
  window.location.reload() 
}
type(event :Event){//(change)="type($event)
  const target=event.target as HTMLInputElement;
        const file=target.value
        this.inputRech1=file
        var nombre=parseInt(file)
        this.IdInvite=nombre
        console.log(this.IdInvite)
      
      return this.IdInvite;
}

InvitelistGroup4(droupeTest:string){
  this.services.listGroup().subscribe({
    next:(data)=>{
      //listeReceptionsBack:Array<ListReceptionsBack>
      this.messGroup4=data.filter((d)=>{
        return (d.groupe==droupeTest && d.userInit==this.IdInvite);

        // this.listeTaches=data;
        //     this.nombre_action_client=this.listeTaches.length 
        //     console.log (this.listeTaches.length )
        //     this.deleteConfirmation(id,roles) 

      })  
      console.log(this.messGroup4) 
      this.testExist=this.messGroup4.length
      console.log(this.testExist);  
    } 
  })
  this.deleteConfirmation(droupeTest);
}
deleteConfirmation(group:string){
  Swal.fire(
    {
      title:'Invitaion !',
      text:'Voulez vous inviter le?',
      showCancelButton:true,
      confirmButtonText:'Oui',
      cancelButtonText:'Non',
      confirmButtonColor:'red',
      cancelButtonColor:'green',
      width:'10cm',
      background:'white',
    }).then((resultat)=>{
      if(resultat.value){
            if(this.testExist==0){
              this.InviterMessageGroupe(group)
              }else{
               this.dejaMembre()
              }
      }else if(resultat.dismiss===Swal.DismissReason.cancel){  
      }
    })
}
dejaMembre(){
  Swal.fire(
    {
      title:'On ne peut pas faire !',
      text:'Utulisateur deja membre',
      width:'10cm',
      background:'red', 
    })
}
existe(){
  Swal.fire(
    {
      title:'On ne peut pas faire !',
      text:'Votre nom de groupe deja existe',
      width:'10cm',
      background:'red', 
    })
}

chercherGroup(event: Event){ 
  ///(keyup)="chercherGroup($event)
    const target=event.target as HTMLInputElement;
    const file=target.value
    this.inputRech=file
    this.services.listGroup().subscribe({
      next:(data)=>{
        if(this.inputRech){
          this.messGroup5=data.filter(re=>re.groupe==this.inputRech)
          this.grupNombre=this.messGroup5.length
         
        }
      }
    })
}



}

