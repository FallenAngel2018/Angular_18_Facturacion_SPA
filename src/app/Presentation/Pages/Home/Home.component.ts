import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from './components/NavBar/NavBar.component';

@Component({
  selector: 'app-Home',
  standalone: true, 
  templateUrl: './Home.component.html',
  imports: [ NavBarComponent ],
  styleUrls: [ './Home.component.scss' ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
