import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navData, navDatas, navDatass } from './data';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur-auth.service';
import { faCoffee } from '@fortawesome/fontawesome-free';
interface NavToggle {
  screenWidth: number;
  openNav: boolean;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  @Output() onToggleNav: EventEmitter<NavToggle> = new EventEmitter();
  openNav = true;
  data = navData;
  datas = navDatas;
  datass=navDatass
  screenWidth = 0;
  role: any
  roles:any=this.userservice.getRole();


  constructor(public servi: UtilisateurService,private userservice:UtilisateurAuthService) { }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 600) {
      this.openNav = false;
      this.onToggleNav.emit({ openNav: this.openNav, screenWidth: this.screenWidth });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
  onOpenNav(): void {
    this.openNav = !this.openNav;
    this.onToggleNav.emit({ openNav: this.openNav, screenWidth: this.screenWidth });
  }
  onColseNav(): void {
    this.openNav = false;
    this.onToggleNav.emit({ openNav: this.openNav, screenWidth: this.screenWidth });
  }


}
