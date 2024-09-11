import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserApp } from '../../../../../Application/User/UserApp';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../../../../Domain/User/UserModel';

@Component({
  selector: 'app-AddUserModal',
  standalone: true,
  templateUrl: './AddUserModal.component.html',
  styleUrls: ['./AddUserModal.component.scss'],
  imports:[ ReactiveFormsModule, FormsModule, CommonModule ],
  providers: [ UserApp ],
})
export class AddUserModalComponent implements OnInit {

  // Campos modal
  @Input() user: UserModel = new UserModel(); // Este usuario puede ser null si es un nuevo usuario.
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
    if(this.isEditMode) {
      this.userForm.patchValue({
        Nombre: this.user.Nombre
      });
    }
    if(!this.isEditMode) {
      this.cleanForm();
      this.userForm.reset();
    }
  }

  save() {
    if (this.userForm.valid) {
      // Obtener los datos del formulario
      const user: UserModel = this.userForm.value;
      console.log('User Data:', user);
      debugger;

      const header = new HttpHeaders(
        {
          'Accept': '*/*', // */*  text/plain
          'Content-Type': 'application/json',
        },
      );

      // Si se está agregando un usuario nuevo...
      if(!this.isEditMode) {
        this.userApp.addUser(this.http, user, header)
        .then(response => {
          console.log("typeof response:");
          console.log(typeof response);
          console.log(response);
        })
        .catch(error => console.error('Error de login:', error));
      }

      // Si se está actualizando un usuario seleccionado por el usuario...
      if(this.isEditMode && user.IdUsuario! > 0) {
        this.userApp.updateUser(this.http, user, header)
        .then(response => {
          console.log("typeof response:");
          console.log(typeof response);
          console.log(response);
        })
        .catch(error => console.error('Error de login:', error));
      }

      // this.save.emit();
      this.close();
    } else {
      console.log('Form is invalid');
    }
  }

  close() {
    this.user = new UserModel();
    this.cleanForm();
    this.userForm.reset();
    this.closeModal.emit();
  }

  cleanForm(): void {
    this.userForm.patchValue({
      Nombre: "",
      NombreUsuario: "",
      ClaveUsuario: "",
      TipoUsuario: "",
    });
  }

}
