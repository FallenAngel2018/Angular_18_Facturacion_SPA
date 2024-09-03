import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from './components/NavBar/NavBar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-Home',
  standalone: true, 
  templateUrl: './Home.component.html',
  imports: [ NavBarComponent, RouterLink, RouterOutlet ],
  styleUrls: [ './Home.component.scss' ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
