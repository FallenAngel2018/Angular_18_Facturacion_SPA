import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from './components/NavBar/NavBar.component';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../../Domain/User/UserModel';
import { UserApp } from '../../../Application/User/UserApp';

@Component({
  selector: 'app-Login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, RouterOutlet, NavBarComponent ],
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isFormSubmitted: boolean = false;
  loginSuccess: Boolean = false;
  loginMessage: String = "";
  userNameFormControl: AbstractControl;
  passwordFormControl: AbstractControl;

  // constructor(private router: Router) {
  constructor(private http: HttpClient, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl("", [ Validators.required, Validators.minLength(4) ]),
      password: new FormControl("", [ Validators.required, Validators.minLength(5) ]),
    });

    this.userNameFormControl = this.loginForm.controls["username"];
    this.passwordFormControl = this.loginForm.controls["password"];
  }


  ngOnInit() {
  }


  onSubmit(loginForm: FormGroup) {
    // TODO: Use EventEmitter with form value
    console.log("Login Form Values");
    console.warn(this.loginForm.value);
    this.isFormSubmitted = true; // this.loginForm.markAsTouched();

    
    const headers = new HttpHeaders()
      .set("accept", "text/plain")
      .set('Content-Type', 'application/json;',);
    const header = new HttpHeaders(
      {
        'Accept': '*/*', // */*  text/plain
        'Content-Type': 'application/json',
        // 'responseType':'json'
      },
    );
    
    
    const data : UserModel = {
      NombreUsuario: this.userNameFormControl.value,
      ClaveUsuario: this.passwordFormControl.value
    };

    const userApp = new UserApp();

    userApp.login(this.http, data, header)
      .then(response => {
        if(response["LoginExitoso"]) {
          this.router.navigate(['home']);
        }

        if(!response["LoginExitoso"]) {
          this.loginSuccess = false;
          this.loginMessage = response["Message"];
        }
      })
      .catch(error => console.error('Error de login:', error));

  }

}
