import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
})
export class NavMenuComponent implements OnInit, OnChanges  {

  role: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.role = localStorage.getItem('role');
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }
  
  logOut() {
    localStorage.clear();
  }
}
