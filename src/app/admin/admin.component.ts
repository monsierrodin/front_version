import { Component, OnInit } from '@angular/core';
interface NavToggle{
  screenWidth:number;
  openNav:boolean;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isOpenNav=false;
  screenWidth=0;

  constructor() { }

  ngOnInit(): void {
  }
  onToggleNav(data:NavToggle):void{
    this.isOpenNav=data.openNav;
    this.screenWidth=data.screenWidth;
  }

}
