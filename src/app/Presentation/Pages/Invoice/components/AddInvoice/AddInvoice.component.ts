import { InvoiceService } from '../../Services/Invoice.service';
import { ClientModel } from '../../../../../Domain/Client/ClientModel';
import { DetailInvoiceModel } from '../../../../../Domain/DetailInvoice/DetailInvoiceModel';
import { AddInvoiceDetailModalComponent } from "../AddInvoiceDetailModal/AddInvoiceDetailModal.component";

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClientApp } from '../../../../../Application/Client/ClientApp';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-AddInvoice',
  standalone: true,
  templateUrl: './AddInvoice.component.html',
  styleUrls: ['./AddInvoice.component.css'],
  imports: [
    CommonModule, AddInvoiceDetailModalComponent, FormsModule,
    ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule
  ],
  providers: [ ClientApp ],
})
export class AddInvoiceComponent implements OnInit {

  todayDate: string;
  isModalOpen = false;
  totalInvoice: number = 0;
  detalles: DetailInvoiceModel[] = [];

  phoneNumberInput?: string = ''; // Inicializa el valor
  mailInput?: string = ''; // Inicializa el valor

  // Opciones cliente
  // LISTA DEBE VENIR DESDE LA BASE DE DATOS
  clientes: ClientModel[] = [];
  // clientes: ClientModel[] = [
  //   new ClientModel(1, "000555122", "Juan Pérez", "05", "q@gmail.com"),
  //   new ClientModel(2, "000555122", "Ana García", "05", "q@gmail.com"),
  //   new ClientModel(3, "000555122", "Luis Fernández", "05", "q@gmail.com"),
  //   new ClientModel(4, "000555122", "María López", "05", "q@gmail.com"),
  // ];
  clienteSeleccionado: string = '';
  isClienteValido: boolean = false;

  // PENDIENTE npm install @angular/cdk
  constructor(private invoiceService: InvoiceService, private http: HttpClient, private clientApp: ClientApp) {
    this.todayDate = "";
    this.getCurrentDate();
  }

  async ngOnInit() {
    // this.invoiceService.detalles$.subscribe(detalles => {
    //   this.detalles = detalles;
    // });

    const data : ClientModel = { };
    const headers = new HttpHeaders(
      {
        'Accept': '*/*', // */*  text/plain
        'Content-Type': 'application/json',
      },
    );

    this.clientes = await this.clientApp.getClients(this.http, data, headers)
      .then(response => {
        console.log("typeof response:");
        console.log(typeof response);
        console.log(response);

        return response;
      })
      .catch(error => console.error('Error:', error));

  }

  //#region Métodos - Input Cliente

  selectedClient(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valorIngresado = input.value;

    // Verificar si el valor ingresado coincide con alguna opción de la lista
    // this.isClienteValido = this.clientes.includes(valorIngresado);
    // Verificar si el valor ingresado coincide con el nombre de algún cliente en la lista
    const clienteEncontrado = this.clientes.find(cliente => cliente.NombreCliente === valorIngresado);
    this.isClienteValido = clienteEncontrado != null && clienteEncontrado != null

    console.log("isClienteValido:");
    console.log(this.isClienteValido);
    console.log(clienteEncontrado);

    // Solo asignar el valor si es válido
    if (this.isClienteValido) {
      this.clienteSeleccionado = valorIngresado;
      // Asignar correo del cliente seleccionado al campo input
      this.phoneNumberInput = clienteEncontrado?.NumTelefono;

      // Asignar telefono del cliente seleccionado al campo input
      this.mailInput = clienteEncontrado?.Correo;
    } else {
      this.clienteSeleccionado = '';
    }
  }

  //#endregion


  getCurrentDate() {
    // Obtiene la fecha actual en formato "YYYY-MM-DD"
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
    const dd = String(today.getDate()).padStart(2, '0'); // Día con dos dígitos
    this.todayDate = `${yyyy}-${mm}-${dd}`;
  }

  // Método para agregar un producto al detalle de la factura
  addProductToInvoice(detalle: DetailInvoiceModel) {
    console.log("Método addProductToInvoice en AddInvoice ejecutado");
    console.log("Detalle:");
    console.log(detalle);

    if(detalle != undefined && detalle != null) {
      console.log("this.detalles.length:");
      console.log(this.detalles.length);

      const detailsLength = this.detalles.length;

      // Si es el primero de la lista, se le asigna un 0 como id
      if(detailsLength == 0) {
        detalle.IdDetalleFactura = 0;
      }

      // Si ya existe un elemento en el array, se obtiene el id del último elemento agregado
      if(detailsLength > 0) {
        const ultimoDetalle = this.detalles[(detailsLength - 1)];
        const nuevoId = ultimoDetalle.IdDetalleFactura! + 1;
        detalle.IdDetalleFactura = nuevoId;
      }

      this.detalles.push(detalle);
      // this.invoiceService.setDetalles(this.detalles);

      console.log(this.detalles);

      this.totalInvoice += detalle.Total!;
    }
  }

  substractProductToInvoice(detalle: DetailInvoiceModel) {
    if(detalle != undefined && detalle != null) {
      var index = this.detalles.findIndex(x => x.IdDetalleFactura == detalle.IdDetalleFactura);

      this.detalles.splice(index, 1);
      // this.invoiceService.setDetalles(this.detalles);

      this.totalInvoice -= detalle.Total!;
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  handleSave() {
    console.log('Detail Data:');
    console.log(this.detalles);
  }

}
