import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientModel } from '../../../../../Domain/Client/ClientModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientApp } from '../../../../../Application/Client/ClientApp';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-AddClientModal',
  standalone: true,
  templateUrl: './AddClientModal.component.html',
  styleUrls: ['./AddClientModal.component.scss'],
  imports:[ ReactiveFormsModule, CommonModule ],
  providers: [ ClientApp ],
})
export class AddClientModalComponent implements OnInit {

  // Campos modal
  @Input() isOpen: boolean = false;
  @Input() isEditMode: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  // Campos formulario
  clientForm: FormGroup;
  idNumberFormControl: AbstractControl;
  nameFormControl: AbstractControl;
  phoneNumberFormControl: AbstractControl;
  mailFormControl: AbstractControl;

  constructor(private http: HttpClient, private clientApp: ClientApp) {
    this.clientForm = new FormGroup({
      NumIdentificacion: new FormControl("", [ Validators.required, Validators.minLength(10) ]),
      NombreCliente: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
      NumTelefono: new FormControl("", [ Validators.required, Validators.minLength(7) ]),
      Correo: new FormControl("", [ Validators.required, Validators.minLength(10) ]),
    });

    this.idNumberFormControl = this.clientForm.controls["NumIdentificacion"];
    this.nameFormControl = this.clientForm.controls["NombreCliente"];
    this.phoneNumberFormControl = this.clientForm.controls["NumTelefono"];
    this.mailFormControl = this.clientForm.controls["Correo"];
    
  }

  ngOnInit() {
    
  }

  saveClient() {
    if (this.clientForm.valid) {
      // Obtener los datos del formulario
      const client: ClientModel = this.clientForm.value;
      console.log('Client Data:', client);

      const header = new HttpHeaders(
        {
          'Accept': '*/*', // */*  text/plain
          'Content-Type': 'application/json',
        },
      );


      this.clientApp.addClient(this.http, client, header)
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
