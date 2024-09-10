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
  idNumberFormControl: AbstractControl;
  nameFormControl: AbstractControl;
  phoneNumberFormControl: AbstractControl;
  mailFormControl: AbstractControl;

  constructor(private http: HttpClient, private userApp: UserApp) {
    this.userForm = new FormGroup({
      NumIdentificacion: new FormControl("", [ Validators.required, Validators.minLength(10) ]),
      NombreCliente: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
      NumTelefono: new FormControl("", [ Validators.required, Validators.minLength(7) ]),
      Correo: new FormControl("", [ Validators.required, Validators.minLength(10) ]),
    });

    this.idNumberFormControl = this.userForm.controls["NumIdentificacion"];
    this.nameFormControl = this.userForm.controls["NombreCliente"];
    this.phoneNumberFormControl = this.userForm.controls["NumTelefono"];
    this.mailFormControl = this.userForm.controls["Correo"];
  }

  ngOnInit() {
  }

  save() {
    if (this.userForm.valid) {
      // Obtener los datos del formulario
      const client: UserModel = this.userForm.value;
      console.log('User Data:', client);

      const header = new HttpHeaders(
        {
          'Accept': '*/*', // */*  text/plain
          'Content-Type': 'application/json',
        },
      );


      this.userApp.addUser(this.http, client, header)
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
