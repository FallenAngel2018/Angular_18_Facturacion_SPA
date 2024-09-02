import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-NavBar',
  standalone: true,
  templateUrl: './NavBar.component.html',
  imports:[
    RouterModule
  ],
  styleUrls: ['./NavBar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
