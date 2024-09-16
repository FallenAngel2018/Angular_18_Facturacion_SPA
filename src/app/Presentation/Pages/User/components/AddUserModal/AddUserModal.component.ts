import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserApp } from '../../../../../Application/User/UserApp';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../../../../Domain/User/UserModel';
import { UserTypePipe } from '../../Pipes/UserType.pipe';
import { UserTypes } from '../../../../../Utils/UserTypes';

@Component({
  selector: 'app-AddUserModal',
  standalone: true,
  templateUrl: './AddUserModal.component.html',
  styleUrls: ['./AddUserModal.component.scss'],
  imports:[ ReactiveFormsModule, FormsModule, CommonModule, UserTypePipe ],
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
  userTypes = Object.values(UserTypes).filter(value => typeof value === 'number'); // Obtiene los valores numéricos del enum
  selectedUserType: number = UserTypes.Admin; // Valor inicial

  
  constructor(private http: HttpClient, private userApp: UserApp) {
    this.userForm = new FormGroup({
      Nombre: new FormControl("", [ Validators.required, Validators.minLength(4) ]),
      NombreUsuario: new FormControl("", [ Validators.required, Validators.minLength(5) ]),
      ClaveUsuario: new FormControl("", [ Validators.required, Validators.minLength(5) ]),
      TipoUsuario: new FormControl(this.selectedUserType, [ Validators.required ]),
    });

    this.nameFormControl = this.userForm.controls["Nombre"];
    this.usernameFormControl = this.userForm.controls["NombreUsuario"];
    this.passwordFormControl = this.userForm.controls["ClaveUsuario"];
    this.userTypeFormControl = this.userForm.controls["TipoUsuario"];
  }
  
  ngOnInit() {
    if(this.isEditMode) {
      this.userForm.patchValue({
        IdUsuario: this.user.IdUsuario,
        Nombre: this.user.Nombre,
        NombreUsuario: this.user.NombreUsuario,
        ClaveUsuario: this.user.ClaveUsuario,
        TipoUsuario: this.user.TipoUsuario,
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
      const user = {
        IdUsuario: this.user.IdUsuario, // Usa el id almacenado, si no existe va como undefined
        ...this.userForm.value
      };
      console.log('User Data:', user);

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
          console.log(response);
        })
        .catch(error => console.error('Error:', error));
      }

      // Si se está actualizando un usuario seleccionado por el usuario...
      if(this.isEditMode && user.IdUsuario! > 0) {
        this.userApp.updateUser(this.http, user, header)
        .then(response => {
          console.log(response);
        })
        .catch(error => console.error('Error:', error));
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
