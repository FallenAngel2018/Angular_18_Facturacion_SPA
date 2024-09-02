import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from './components/NavBar/NavBar.component';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../../Domain/User/UserModel';

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
  userNameFormControl: AbstractControl;
  passwordFormControl: AbstractControl;
  // httpClient: HttpClient;

  // constructor(private router: Router) {
  constructor(private http: HttpClient, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl("", [ Validators.required, Validators.minLength(4) ]),
      password: new FormControl("", [ Validators.required, Validators.minLength(5) ]),
    });

    this.userNameFormControl = this.loginForm.controls["username"];
    this.passwordFormControl = this.loginForm.controls["password"];
    // this.httpClient = http;

  }


  ngOnInit() {
  }


  onSubmit(loginForm: FormGroup) {
    // TODO: Use EventEmitter with form value
    console.log("Login Form Values");
    console.warn(this.loginForm.value);
    const isFormValid = loginForm.valid;    
    this.isFormSubmitted = true; // this.loginForm.markAsTouched();

    // this.httpClient.request('POST', this.heroesUrl, {responseType:'json', params});
    const headers = new HttpHeaders()
      .set("accept", "text/plain")
      .set('Content-Type', 'application/json;',);
    const header = new HttpHeaders(
      {
        'Accept': '*/*', // */*  text/plain
        'Content-Type': 'application/json'
      },
    );
    

    const data = {
      nombreUsuario: this.userNameFormControl.value,
      claveUsuario: this.passwordFormControl.value
    };
    console.log("Data:");
    console.log(`${data}`);
    console.log(data);


    // debugger;
    
    // Fuente: https://stackoverflow.com/questions/62293609/simple-post-request-in-angular-2-with-type-or-model
    // await this.http.get("https://localhost:7099/api/User").subscribe(result => {
    //   console.log(result);
    // }, error => console.error(error));
    
    // Fuente: https://stackoverflow.com/questions/62293609/simple-post-request-in-angular-2-with-type-or-model
    // Fuente (uso del subscribe): https://stackoverflow.com/questions/55472124/subscribe-is-deprecated-use-an-observer-instead-of-an-error-callback
    this.http.post("https://localhost:7099/api/User/request_login",
      data, { headers: header }
    ).subscribe({
      next: (response) => {
        console.log("post next pasa primero");
        console.log(response);
        console.log(`${response}`);

        if(response == true) {
          console.log("response == true");
          this.router.navigate(['home']);
          // this.router.navigateByUrl('/home');
          // this.router.navigate(['home']);
          // this.router.navigateByUrl('home');
        }
      },     // nextHandler
      complete: () => {
        console.log("post complete para al final si no hay errores");
        
      }, // completeHandler
      error: (error) => { console.log(`post error: ${error}`) },    // errorHandler 
    });
 
    
    // this.router.navigate(['home']);
    // this.router.navigateByUrl('/home');
  }

}
