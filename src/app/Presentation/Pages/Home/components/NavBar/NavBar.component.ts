import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeNavBarRoutes } from "../../../../../Utils/HomeNavBarRoutes";

@Component({
  selector: 'app-NavBar',
  standalone: true,
  templateUrl: './NavBar.component.html',
  imports:[ RouterLink, RouterOutlet, CommonModule ],
  styleUrls: ['./NavBar.component.css']
})

export class NavBarComponent implements OnInit {

  navData = HomeNavBarRoutes;

  constructor() { }

  ngOnInit() {
  }

}
