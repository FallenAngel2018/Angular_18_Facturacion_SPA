import { InvoiceService } from '../../Services/Invoice.service';
import { ClientModel } from '../../../../../Domain/Client/ClientModel';
import { DetailInvoiceModel } from '../../../../../Domain/DetailInvoice/DetailInvoiceModel';
import { AddInvoiceDetailModalComponent } from "../AddInvoiceDetailModal/AddInvoiceDetailModal.component";

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormsModule, Validators } from '@angular/forms'; // Importa FormsModule
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClientApp } from '../../../../../Application/Client/ClientApp';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../../../../Domain/User/UserModel';
import { UserApp } from '../../../../../Application/User/UserApp';
import { InvoiceModel } from '../../../../../Domain/Invoice/InvoiceModel';

@Component({
  selector: 'app-AddInvoice',
  standalone: true,
  templateUrl: './AddInvoice.component.html',
  styleUrls: ['./AddInvoice.component.css'],
  imports: [
    CommonModule, AddInvoiceDetailModalComponent, FormsModule,
    ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule,
    DatePipe,
  ],
  providers: [ ClientApp, UserApp ],
})
export class AddInvoiceComponent implements OnInit {

  todayDate: string;
  currentDate: Date = new Date();
  isModalOpen = false;
  phoneNumberInput?: string = ''; // Inicializa el valor
  mailInput?: string = ''; // Inicializa el valor
  totalInvoice: number = 0;
  
  // Lista y opciones cliente
  clientes: ClientModel[] = [];
  clienteSeleccionado: ClientModel = new ClientModel(); // string = '';
  isClienteValido: boolean = false;

  // Lista y opciones vendedores (Usuarios)
  vendedores: UserModel[] = []; // Solo usuarios tipo Vendedor = 1
  vendedorSeleccionado: UserModel = new UserModel(); // string = '';
  isVendedorValido: boolean = false;

  // Lista y opciones métodos de pago
  metodosPago: UserModel[] = []; // Solo usuarios tipo Vendedor = 1
  metodoPagoSeleccionado: UserModel = new UserModel(); // string = '';
  isMetodoPagoValido: boolean = false;

  // Lista y opciones detalles de factura
  detalles: DetailInvoiceModel[] = [];

  invoiceForm: FormGroup;
  clientFormControl: AbstractControl;
  phoneNumberFormControl: AbstractControl;
  mailFormControl: AbstractControl;


  // PENDIENTE npm install @angular/cdk
  constructor(private invoiceService: InvoiceService) {
    this.todayDate = new Date().toLocaleString(); // "";
    // this.getCurrentDate();
    this.invoiceForm = new FormGroup({
      IdCliente: new FormControl("", [ Validators.required ]),
      NumTelefono: new FormControl("", [ Validators.required, Validators.minLength(7) ]),
      Correo: new FormControl("", [ Validators.required, Validators.minLength(5) ]),
    });

    this.clientFormControl = this.invoiceForm.controls["IdCliente"];
    this.phoneNumberFormControl = this.invoiceForm.controls["NumTelefono"];
    this.mailFormControl = this.invoiceForm.controls["Correo"];
  }

  async ngOnInit() {
    // this.invoiceService.detalles$.subscribe(detalles => {
    //   this.detalles = detalles;
    // });

    console.log("this.currentDate");
    console.log(this.currentDate);

    this.clientes = await this.invoiceService.loadClients();
    // Realmente debería setearse este campo al momento de hacer login
    this.vendedores = await this.invoiceService.loadSellers();
    this.detalles = this.invoiceService.getDetalles();


  }

  //#region Métodos - Input Cliente

  selectedClient(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valorIngresado = input.value;

    // Verificar si el valor ingresado coincide con el nombre de algún cliente en la lista
    const clienteEncontrado = this.clientes.find(cliente => cliente.NombreCliente === valorIngresado);
    this.isClienteValido = clienteEncontrado != null && clienteEncontrado != null

    console.log("isClienteValido:");
    console.log(this.isClienteValido);
    console.log(clienteEncontrado);

    // Solo asignar el valor si es válido
    if (this.isClienteValido) {
      this.clienteSeleccionado.NombreCliente = valorIngresado;
      // Asignar correo del cliente seleccionado al campo input
      this.phoneNumberInput = clienteEncontrado?.NumTelefono;

      // Asignar telefono del cliente seleccionado al campo input
      this.mailInput = clienteEncontrado?.Correo;
    } else {
      this.clienteSeleccionado.NombreCliente = '';
    }

  }

  //#endregion

  //#region Métodos - Input Vendedor
  
  selectedSeller(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valorIngresado = input.value;

    // Verificar si el valor ingresado coincide con el nombre de algún vendedor en la lista
    const vendedorEncontrado = this.vendedores.find(vendedor => vendedor.Nombre === valorIngresado);
    this.isVendedorValido = vendedorEncontrado != null && vendedorEncontrado != null;

    console.log("isVendedorValido:");
    console.log(this.isVendedorValido);
    console.log(vendedorEncontrado);

    // Solo asignar el valor si es válido
    if(this.isVendedorValido) {
      this.vendedorSeleccionado.Nombre = valorIngresado;
      // Asignar correo del cliente seleccionado al campo input
      // Asignar telefono del cliente seleccionado al campo input
    } else {
      this.vendedorSeleccionado.Nombre = '';
    }
  }

  //#endregion

  selectedMethodPayment(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valorIngresado = input.value;
    console.log(valorIngresado);

    // Verificar si el valor ingresado coincide con el nombre de algún cliente en la lista
    const formaPagoEncontrado = this.vendedores.find(vendedor => vendedor.Nombre === valorIngresado);
    this.isClienteValido = formaPagoEncontrado != null && formaPagoEncontrado != null;

    console.log("formaPagoEncontrado:");
    console.log(this.isVendedorValido);
    console.log(formaPagoEncontrado);

    // Solo asignar el valor si es válido
    if (this.isVendedorValido) {
      this.vendedorSeleccionado.Nombre = valorIngresado;
      // Asignar correo del cliente seleccionado al campo input
      // Asignar telefono del cliente seleccionado al campo input
    } else {
      this.vendedorSeleccionado.Nombre = '';
    }
  }


  getCurrentDate() {
    // Obtiene la fecha actual en formato "YYYY-MM-DD"
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
    const dd = String(today.getDate()).padStart(2, '0'); // Día con dos dígitos
    
    // this.todayDate = `${yyyy}-${mm}-${dd}`; // Solo cuando este campo es todayDate

    // this.todayDate = new Date();
  }


  //#region Métodos calculo de total

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
        // detalle.PrecioUnitario = detalle.Producto?.PrecioProducto;
        this.detalles.push(detalle);
      }

      // Si ya existe un elemento en el array, se obtiene el id del último elemento agregado
      if(detailsLength > 0) {
        const detalleExistente = this.detalles.find(detail => detail.Producto?.IdProducto === detalle.Producto?.IdProducto);
        console.log("this.detalles.includes(detalleExistente!)");

        if(detalleExistente) {
          // Si el detalle ya existe, actualizamos las propiedades Cantidad y Total
          detalleExistente!.Cantidad! += detalle.Cantidad!;
          detalleExistente!.Total! += detalle.Total!;
        } else {
          const ultimoDetalle = this.detalles[(detailsLength - 1)];
          const nuevoId = ultimoDetalle.IdDetalleFactura! + 1;
          detalle.IdDetalleFactura = nuevoId;
          // detalle.PrecioUnitario = detalle.Producto?.PrecioProducto;
          this.detalles.push(detalle);
        }
      }

      this.totalInvoice += detalle.Total!;
    }
  }

  substractProductToInvoice(detalle: DetailInvoiceModel) {
    if(detalle != undefined && detalle != null) {
      var index = this.detalles.findIndex(x => x.IdDetalleFactura == detalle.IdDetalleFactura);

      this.detalles.splice(index, 1);
      this.totalInvoice -= detalle.Total!;

      if(this.detalles.length == 0) {
        this.totalInvoice = 0;
      }
    }
  }

  //#endregion


  openModal() {
    this.isModalOpen = true;
  }

  handleSave() {
    console.log('Detail Data:');
    console.log(this.detalles);

    var invoice = new InvoiceModel(0, this.clienteSeleccionado.IdCliente, this.vendedorSeleccionado.IdUsuario,
      new Date(), 0, this.totalInvoice, this.detalles
    );

    const invoiceConst = {
      IdFactura: 0,
      ...this.invoiceForm.value,
    };


    console.log("invoice:");
    console.log(invoice);
    console.log("invoiceConst:");
    console.log(invoiceConst);

    // ENVIAR OBJETO invoice HACIA EL SERVICE DE INVOICE Y QUE ESO LLAME A LA APP
    
  }


}
