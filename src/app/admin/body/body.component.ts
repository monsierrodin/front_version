import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
 @Input() openNav=false;
 @Input() screenWidth=0;

  constructor() { }

  ngOnInit(): void {
  }
  getBody():string{
    let style='';
    if(this.openNav && this.screenWidth > 600){
      style='body-strimEnd';
    }else if(this.openNav && this.screenWidth < 600 && this.screenWidth > 0){
      style='body-md-screen';
    }
    return style;
  }
 
}
