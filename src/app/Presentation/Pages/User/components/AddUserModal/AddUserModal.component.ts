import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserApp } from '../../../../../Application/User/UserApp';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../../../../Domain/User/UserModel';

@Component({
  selector: 'app-AddUserModal',
  standalone: true,
  templateUrl: './AddUserModal.component.html',
  styleUrls: ['./AddUserModal.component.scss'],
  imports:[ ReactiveFormsModule, CommonModule ],
  providers: [ UserApp ],
})
export class AddUserModalComponent implements OnInit {

  // Campos modal
  @Input() isOpen: boolean = false;
  @Input() isEditMode: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  // Campos formulario
  userForm: FormGroup;
  nameFormControl: AbstractControl;
  usernameFormControl: AbstractControl;
  passwordFormControl: AbstractControl;
  userTypeFormControl: AbstractControl;

  constructor(private http: HttpClient, private userApp: UserApp) {
    this.userForm = new FormGroup({
      Nombre: new FormControl("", [ Validators.required, Validators.minLength(4) ]),
      NombreUsuario: new FormControl("", [ Validators.required, Validators.minLength(5) ]),
      ClaveUsuario: new FormControl("", [ Validators.required, Validators.minLength(7) ]),
      TipoUsuario: new FormControl("", [ Validators.required ]),
    });

    this.nameFormControl = this.userForm.controls["Nombre"];
    this.usernameFormControl = this.userForm.controls["NombreUsuario"];
    this.passwordFormControl = this.userForm.controls["ClaveUsuario"];
    this.userTypeFormControl = this.userForm.controls["TipoUsuario"];
  }

  ngOnInit() {
  }

  save() {
    if (this.userForm.valid) {
      // Obtener los datos del formulario
      const user: UserModel = this.userForm.value;
      console.log('User Data:', user);

      const header = new HttpHeaders(
        {
          'Accept': '*/*', // */*  text/plain
          'Content-Type': 'application/json',
        },
      );

      this.userApp.addUser(this.http, user, header)
        .then(response => {
          console.log("typeof response:");
          console.log(typeof response);
          console.log(response);
        })
        .catch(error => console.error('Error de login:', error));
        
      // this.save.emit();
      this.close();
    } else {
      console.log('Form is invalid');
    }
  }

  close() {
    this.closeModal.emit();
  }

}
