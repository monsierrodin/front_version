import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import { ChatGroupRequest, ChatRequest, GetChat  } from 'src/app/model/chatRequest.mode';
import { group } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-m',
  templateUrl: './chat-m.component.html',
  styleUrls: ['./chat-m.component.scss']
})
export class ChatMComponent implements OnInit {
  @ViewChild('scrollableElement') scrollableElement: ElementRef | undefined;
  nomExpediteur!: any
  User: any;
  utilisateur: any
  listGroup: any
  idUser!: number
  formMessage!: FormGroup
  formMessageByGroup !: FormGroup
  checkClient: any
  listMessageLength:any
  listMessage: any
  listMessageCount: any
  listMessageByGroup: any
  idDestinateur!: number
  nomDestinateur!: string
  selected: boolean = false
  nomGroupCheck!: string
  number!: number
  role:any=this.serviceUser.getRole();

  constructor(private router:Router,private serviceUser:UtilisateurAuthService,private fb: FormBuilder, private service: ChatService, private utilisateurService: UtilisateurAuthService) {
    this.idUser = parseInt(utilisateurService.getIdUser()!)
    service.getUtilisateurById(this.idUser).subscribe({
      next: (data) => {
        this.nomDestinateur = data.nom!
      }
    })
    this.nomGroupCheck = this.getNomGrougCheck()!
    service.getUtilisateurByEmail(this.checkUser()!).subscribe({
      next: (data) => {
        this.idDestinateur = data.id!
      }
    })
  }

  ngOnInit(): void {
  if(this.role=='CLIENT'){
    this.router.navigate(['/']);
  }else{
    this.getUtilisateur()
    this.geListGroup()
    this.formMessage = this.fb.group({
      message: this.fb.control("", [Validators.required])
    });
    this.formMessageByGroup = this.fb.group({
      messageGroup: this.fb.control("", [Validators.required])
    });

    interval(1000).subscribe(() => {
      this.getMessage()
      this.listUserIsLenghtMessage()
      this.getMessageByGroup();
    })
    this.checkClient = this.checkUser();
    this.nomExpediteur = this.checkUserNom()
  }
  }

  onScroll(): void {
    const element = this.scrollableElement?.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    console.log(atBottom)
    if (atBottom) {
      element.scrollTop = element.scrollHeight; // Réglez la position de défilement en bas
    }

  }

  getUtilisateur() {
    //
    this.service.getUtilisateur().subscribe({
      next: (data) => {
        this.utilisateur = data
        this.User = this.utilisateur.filter((res: { role: any, id: number }) => {
          return res.role != "CLIENT" && res.id != this.idUser
        })
      }
    })
  }
  selectUser(id: number, email: string) {
    localStorage.setItem("des", email);
    this.checkClient = this.checkUser();
    this.selected = false
    this.modifierMessage(id);
    this.service.getUtilisateurById(id).subscribe({
      next: (data) => {
        localStorage.setItem("desNom", data.nom!);
        this.idDestinateur = data.id!
        this.nomExpediteur = this.checkUserNom();
        this.getMessage()
      }
    });
  }
  ajouterMessage() {
    const email = localStorage.getItem("des")!
    if (email) {
      this.service.getUtilisateurByEmail(email).subscribe({
        next: (data) => {
          this.idDestinateur = data.id!
          this.handleChat()
        }, error: (err) => {
          console.log(err)
        }
      })

    } else {
      alert("")
    }

  }

  checkUser() {
    return localStorage.getItem("des");
  }
  checkUserNom() {
    return localStorage.getItem("desNom");
  }
  getMessage() {
    this.service.getMessages().subscribe({
      next: (data) => {
        this.listMessage = data.filter((res: any) => {
          return (res.idExp == this.idDestinateur && res.userDes.id == this.idUser) || (res.idExp == this.idUser && res.userDes.id == this.idDestinateur)
        })
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  //List By Length
  listUserIsLenghtMessage(){
    this.service.listUserByLength(this.idUser).subscribe({
      next: (data)=>{
        this.listMessageLength=data
      }, error:(err)=>{
        console.log(err)
      }
    })
  }
  public test2(id:number): number {

    if(this.listMessageLength.length == 0){
      return 0;
    }else{
      var elementExist=this.listMessageLength.some((element: {idExp:number;})=>{
        return element.idExp===id;
      });
      if(elementExist){
        return this.listMessageLength.find((res:{idExp:number;})=> res.idExp==id).sumMessage;
      }else{
        return 0;
      }
    }


  }
  modifierMessage(idDes:number){
    this.service.modifierMessageVu(idDes,this.idUser).subscribe()
  }
  public getMessageCount(id2:number) {
    console.log(id2)
    this.service.getMessages().subscribe({
      next: (data) => {
        this.listMessageCount = data.filter((res: any) => {
          return (res.idExp == id2 && res.userDes.id == this.idUser)
        })
       // console.log("hfhfh"+this.listMessageCount.length)

      }, error: (err) => {
        console.log(err)
      }

    })
  }

  geListGroup() {
    this.service.getListGroup().subscribe({
      next: (data) => {

        this.listGroup = data.filter((group:{users:any[];})=> group.users.some(user=> user.id===this.idUser))
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  handleChat() {
    const data = new ChatRequest()
    data.idExp = this.idDestinateur
    data.message = this.formMessage.controls['message'].value
    data.idUserDes = this.idUser
    data.dateMsg= new Date()
    data.idUserExp = this.idDestinateur
    this.service.ajouterMessage(data).subscribe({
      next: (data) => {
        this.getMessage()
        this.formMessage.reset(0)
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  // Info by group
  selectGroup(id: number, nom: string) {
    localStorage.setItem("idGroupBychat", id.toString())
    localStorage.setItem("nomGroupBychat", nom)
    this.selected = true
    this.nomGroupCheck = this.getNomGrougCheck()!
    this.getIdGroupCheck()
    this.getMessageByGroup();

  }

  ajouterMessageGroup() {
    const data = new ChatGroupRequest()
    data.idGroup = parseInt(this.getIdGroupCheck()!)
    data.idUser = this.idUser
    data.dateMsg = new Date()
    data.message = this.formMessageByGroup.controls['messageGroup'].value
    this.service.ajouterMessageBychat(data).subscribe({
      next: (data) => {
        this.formMessageByGroup.reset(0)
        this.getMessageByGroup()
      }, error: (err) => {
        alert("erreur via serveur")
      }
    })

  }
  getNomGrougCheck() {
    return localStorage.getItem("nomGroupBychat")
  }
  getIdGroupCheck() {
    return localStorage.getItem("idGroupBychat");
  }
  getMessageByGroup() {
    const idGroup = parseInt(this.getIdGroupCheck()!);
    if (idGroup) {

      this.service.getMessagesByGroup(idGroup).subscribe({
        next: (data) => {
          this.listMessageByGroup = data
        }, error: (err) => {
          console.log(err)
        }
      })
    }

  }
  public test(id: number): number {
    const data = {
      idDes: this.idUser,
      idExp: id
    }
    this.service.getMessage(data).subscribe({
      next: (data) => {
        this.number = data.length
      }
    })
    return this.number;
  }
  public teste(id: number): number {
    return id + 6;
  }
}
