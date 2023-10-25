import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { DasboardComponent } from './admin/dasboard/dasboard.component';
import { RegistreComponent } from './registre/registre.component';
import { ParametreComponent } from './admin/parametre/parametre.component';
import { BodyComponent } from './admin/body/body.component';
import { HttpClientModule } from '@angular/common/http';
import { TacheComponent } from './admin/tache/tache.component';
import { CreertacheComponent } from './admin/creertache/creertache.component';
import { TachetraiterComponent } from './admin/tachetraiter/tachetraiter.component';
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


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    DasboardComponent,
    RegistreComponent,
    ParametreComponent,
    BodyComponent,
    TacheComponent,
    CreertacheComponent,
    TachetraiterComponent,
    FactureComponent,
    ListTacheComponent,
    ListReceptionComponent,
    TraitementComponent,
    ListTraitementComponent,
    UtilisateurComponent,
    ListTachesClientComponent,
    ListReceptionBackComponent,
    UpdateTacheComponent,
    UpdateTraitementComponent,
    ChatComponent,
    LoginBackComponent,
    ChatMComponent,
    GroupChatComponent,
    AprosComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

    ReactiveFormsModule,
    NgxPaginationModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
