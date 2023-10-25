import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DasboardComponent } from './admin/dasboard/dasboard.component';
import { ParametreComponent } from './admin/parametre/parametre.component';
import { LoginComponent } from './login/login.component';
import { RegistreComponent } from './registre/registre.component';
import { TacheComponent } from './admin/tache/tache.component';
import { CreertacheComponent } from './admin/creertache/creertache.component';
import { FactureComponent } from './admin/facture/facture.component';
import { ListTacheComponent } from './admin/list-tache/list-tache.component';
import { ListReceptionComponent } from './admin/list-reception/list-reception.component';
import { TraitementComponent } from './admin/traitement/traitement.component';
import { ListTraitementComponent } from './admin/list-traitement/list-traitement.component';
import { UtilisateurComponent } from './admin/utilisateur/utilisateur.component';
import { ListTachesClientComponent } from './admin/list-taches-client/list-taches-client.component';
import { ListReceptionBackComponent } from './admin/list-reception-back/list-reception-back.component';
import { UpdateTacheComponent } from './admin/update-tache/update-tache.component';
import { UpdateTraitementComponent } from './admin/update-traitement/update-traitement.component';
import { ChatComponent } from './admin/chat/chat.component';
import { LoginBackComponent } from './login-back/login-back.component';
import { ChatMComponent } from './admin/chat-m/chat-m.component';
import { GroupChatComponent } from './admin/group-chat/group-chat.component';
import { AprosComponent } from './apros/apros.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login",component:LoginBackComponent},
  { path: "apropos_developpeur@devIRZ",component:AprosComponent},
  {path: "your_liste_traitement_client", component: ListTraitementComponent },
  {
    path: "admin", component: AdminComponent, children: [
      { path: "", component: DasboardComponent },
      { path: "parametre", component: ParametreComponent },
      { path: "tache", component: TacheComponent },
      { path: "creer_tache", component: CreertacheComponent },
      { path: "list_tache", component: ListTacheComponent },
      { path: "facturation", component: FactureComponent },
      { path: "list_reception", component: ListReceptionComponent },
      { path: "traitement_tache/:id", component: TraitementComponent },
      { path: "your_liste_traitement", component: ListTraitementComponent },
      { path: "utilisateur", component: UtilisateurComponent },//listes des utilisteurs
      { path: "taches_client", component: ListTachesClientComponent },//listes de client pae Client
      { path: "reception_taches_back", component: ListReceptionBackComponent },//listes de client pae Client
      {path: "update_Tache_client/:id",component:UpdateTacheComponent},
      {path: "update_Traitement/:id",component:UpdateTraitementComponent},
      {path: "chatMessage",component:ChatComponent},///admin/chatMessage2
      {path: "chatMessage2",component:ChatMComponent},
      {path: "groupDiscussion",component:GroupChatComponent},
      ////admin/groupDiscussion

    ]
  },
  { path: "registre", component: RegistreComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
