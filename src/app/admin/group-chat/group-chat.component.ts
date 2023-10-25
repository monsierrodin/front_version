import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GroupRequst } from 'src/app/model/chatRequest.mode';
import { ChatService } from 'src/app/services/chat.service';

interface test {
  id: number,
  nom: string
}

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})

export class GroupChatComponent implements OnInit {
  openModal: boolean = false
  formGroup!: FormGroup
  listGroup: any
  utilisateur: any
  User: any
  listUserByGroup: any
  nombreMenbres=0;
  nomGrop!: string
  form: GroupRequst = new GroupRequst()
  differnce: test[] = []
  constructor(private chatService: ChatService, private fb: FormBuilder) {
    this.nomGrop = this.getNomGroup()!
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nom: this.fb.control("", [Validators.required])
    })
    this.getLisGroup()
    this.getListUserByGroup()
    this.listUtilisateurNoByGroup()

  }
  ajoutGroup() {
    this.form = this.formGroup.value
    if (this.formGroup.valid) {
      this.chatService.ajouterGroup(this.form).subscribe({
        next: (data) => {
          this.formGroup.reset(0)
          this.openModal = false
          this.getLisGroup()
        }, error: (err) => {
          alert(err)
        }
      })
    } else {
      return;
    }

  }
  getLisGroup() {
    this.chatService.getListGroup().subscribe({
      next: (data) => {
        this.listGroup = data
        console.log(data)
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  getListUserByGroup() {
    if (this.getId()) {
      this.chatService.getListUserByGroup(this.getId()).subscribe({
        next: (data) => {
          this.listUserByGroup = data
          this.nombreMenbres=this.listUserByGroup.length
        }, error: (err) => {
          console.log(err)
        }
      })
    }

  }

  selectGroup(id: number, nom: string) {
    localStorage.setItem("idByGroup", id.toString())
    localStorage.setItem("nomByGroup", nom)
    this.getListUserByGroup()
    this.listUtilisateurNoByGroup()
    this.nomGrop = this.getNomGroup()!
    this.getId()
  }
  getNomGroup() {
    return localStorage.getItem("nomByGroup");
  }
  getId() {
    return parseInt(localStorage.getItem("idByGroup")!)
  }

  addUserByGroup(idUser: number) {
    this.chatService.addUserByGroup(this.getId(), idUser).subscribe({
      next: (data) => {
        this.getListUserByGroup();
        this.listUtilisateurNoByGroup()
      }, error: (err) => {
        this.getListUserByGroup();
        this.listUtilisateurNoByGroup()
      }
    })

  }
  fermeModal() {
    this.formGroup.reset(0);
    this.openModal = false
  }
  afficherDifference() {
    const array2 = [
      { id: 1, nom: "zo" },
      { id: 2, nom: "zo" },
      { id: 3, nom: "zo" },
      { id: 4, nom: "zo" },
      { id: 8, nom: "zo" },
      { id: 8, nom: "zo" },
      { id: 8, nom: "zo" },
    ];
    const array1 = [
      { id: 1, nom: "zo" },
      { id: 2, nom: "zo" },
      { id: 3, nom: "zo" },
      { id: 4, nom: "zo" },
    ];
    const idSet = new Set(array1.map(obj => obj.id));
    const difference = [];

    for (let obj of array2) {
      if (!idSet.has(obj.id)) {
        difference.push(obj);
      }
    }

    console.log(difference);

  }
  listUtilisateurNoByGroup() {
    if (this.getId()) {
      this.chatService.getListUserNoByGroup(this.getId()).subscribe({
        next: (data) => {
          this.utilisateur = data
          this.User = this.utilisateur.filter((res: { role: any, id: number }) => {
            return res.role == "ADMIN" || res.role == "BACKOFFICE";
          })
        }, error: (err) => {
          console.log(err)
        }
      })
    }
  }
}

function id(value: test, index: number, obj: test[]): value is any {
  throw new Error('Function not implemented.');
}

