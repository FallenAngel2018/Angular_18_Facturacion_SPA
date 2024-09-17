import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { DetailInvoiceModel } from '../../../../../Domain/DetailInvoice/DetailInvoiceModel';
import { ClientModel } from '../../../../../Domain/Client/ClientModel';
import { InvoiceService } from '../../Services/Invoice.service';
import { UserModel } from '../../../../../Domain/User/UserModel';
import { AddInvoiceDetailModalComponent } from "../AddInvoiceDetailModal/AddInvoiceDetailModal.component";
import { InvoiceModel } from '../../../../../Domain/Invoice/InvoiceModel';
// import "~@ng-select/ng-select/themes/default.theme.css";


// Fuente: https://www.npmjs.com/package/@ng-select/ng-select?activeTab=readme
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { Router } from '@angular/router';
import { AddClientModalComponent } from '../../../Client/components/AddClientModal/AddClientModal.component';

@Component({
  selector: 'app-AddInvoicePrueba',
  standalone: true,
  templateUrl: './AddInvoicePrueba.component.html',
  styleUrls: ['./AddInvoicePrueba.component.scss'],
  imports: [
    ReactiveFormsModule, CommonModule, AddInvoiceDetailModalComponent,
    NgLabelTemplateDirective, 
    NgOptionTemplateDirective, NgSelectComponent,
    NgSelectModule, AddClientModalComponent
    // FormsModule, // ESTE ULTIMO QUITAR DESPUES Y VER QUE PASA
  ],
  providers: [DatePipe],
})
export class AddInvoicePruebaComponent implements OnInit {

  currentDate: Date = new Date(Date.now()); // Mantiene el valor original de la fecha
  currentDateTime: string = '';
  isModalOpen = false;
  wasFormSubmitted = false;

  // Campos formulario
  invoiceForm: FormGroup;
  clientFormControl: AbstractControl;
  phoneNumberFormControl: AbstractControl;
  mailFormControl: AbstractControl;
  sellerFormControl: AbstractControl;
  dateFormControl: AbstractControl;
  paymentMethodFormControl: AbstractControl;


  // Lista y opciones cliente
  clientes: ClientModel[] = [];
  clienteSeleccionado: ClientModel = new ClientModel(); // string = '';
  isClienteValido: boolean = false;
  isClientModalOpen = false;

  // Lista y opciones vendedores (Usuarios)
  vendedores: UserModel[] = []; // Solo usuarios tipo Vendedor = 1
  vendedorSeleccionado: UserModel = new UserModel(); // string = '';
  isVendedorValido: boolean = false;

  // Lista y opciones métodos de pago
  metodosPago: UserModel[] = [];
  metodoPagoSeleccionado: UserModel = new UserModel(); // string = '';
  isMetodoPagoValido: boolean = false;

  // Lista y opciones detalles de factura
  detalles: DetailInvoiceModel[] = [];

  totalInvoice: number = 0;

  @Output() detailCreated: EventEmitter<void> = new EventEmitter();


  /*
    IdFactura?: number;
    IdCliente?: number;
    IdUsuarioVendedor?: number;
    FacturaFecha?: Date; // datetime
    FacturaFormaPago?: number; // int
    FacturaTotal?: number; // decimal](10, 2)
    Detalles?: DetailInvoiceModel[];
  */
  constructor(private invoiceService: InvoiceService, private datePipe: DatePipe, private router: Router) {
    const now = new Date();
    this.formatDateTime(new Date(now));
    this.currentDateTime = this.formatDateTime(new Date(now));

    this.invoiceForm = new FormGroup({
      IdCliente: new FormControl(null, [ Validators.required ]),
      NumTelefono: new FormControl({ value: "", disabled: true }, [ Validators.required, Validators.minLength(7) ]),
      Correo: new FormControl({ value: "", disabled: true }, [ Validators.required, Validators.minLength(5) ]),
      IdUsuarioVendedor: new FormControl(null, [ Validators.required ]),
      FacturaFecha: new FormControl({ value: this.currentDateTime, disabled: true }, [ Validators.required ]),
      FacturaFormaPago: new FormControl("", [ Validators.required ]),
    });

    this.clientFormControl = this.invoiceForm.controls["IdCliente"];
    this.phoneNumberFormControl = this.invoiceForm.controls["NumTelefono"];
    this.mailFormControl = this.invoiceForm.controls["Correo"];
    this.sellerFormControl = this.invoiceForm.controls["IdUsuarioVendedor"];
    this.dateFormControl = this.invoiceForm.controls["FacturaFecha"];
    this.paymentMethodFormControl = this.invoiceForm.controls["FacturaFormaPago"];
  }

  async ngOnInit() {
    this.clientes = await this.invoiceService.loadClients();
    // Realmente debería setearse este campo al momento de hacer login
    this.vendedores = await this.invoiceService.loadSellers();
    // this.detalles = this.invoiceService.getDetalles();
    // this.currentDate = new Date();
  }

  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }


  //#region Métodos - Input Cliente

  async clientCreated(client: ClientModel) {
    this.clientes = [...this.clientes,
      {
        IdCliente: client.IdCliente,
        NumIdentificacion: client.NumIdentificacion,
        NombreCliente: client.NombreCliente,
        NumTelefono: client.NumTelefono,
        Correo: client.Correo,
      }
    ];
  }

  selectedClient(client: ClientModel): void { // ClientModel o any
    if(client == null || client === undefined) {
      this.setClientTxtFields(null, "", "");
      return;
    }

    const clienteIngresado = client;

    const clienteEncontrado = this.clientes.find(cliente => cliente.IdCliente === clienteIngresado.IdCliente);
    this.isClienteValido = clienteEncontrado != null && clienteEncontrado != undefined;
    
    // Solo asignar el valor si es válido
    if (this.isClienteValido) {
      this.clienteSeleccionado.NombreCliente = clienteIngresado.NombreCliente;
      this.clienteSeleccionado = clienteEncontrado!;
      this.setClientTxtFields(clienteEncontrado?.IdCliente!, clienteEncontrado?.NumTelefono!, clienteEncontrado?.Correo!);
    } else {
      this.clienteSeleccionado = new ClientModel();
      this.setClientTxtFields(0, "", "");
    }
  }

  setClientTxtFields(IdCliente: number | null, NumTelefono?: string, Correo?: string): void {
    this.clientFormControl.setValue(IdCliente);
    this.phoneNumberFormControl.setValue(NumTelefono);
    this.mailFormControl.setValue(Correo);
  }

  //#endregion

  
  //#region Métodos - Input Vendedor

  selectedSeller(sellerUser: UserModel): void { // ClientModel o any
    if(sellerUser == null || sellerUser === undefined) {
      this.setClientTxtFields(null, "", "");
      return;
    }

    const vendedorIngresado = sellerUser;

    const vendedorEncontrado = this.vendedores.find(v => v.IdUsuario === vendedorIngresado.IdUsuario);
    this.isVendedorValido = vendedorEncontrado != null && vendedorEncontrado != undefined;
    
    // Solo asignar el valor si es válido
    if (this.isVendedorValido) {
      this.vendedorSeleccionado.Nombre = vendedorIngresado.Nombre;
      this.vendedorSeleccionado = vendedorIngresado!;
    } else {
      this.vendedorSeleccionado = new UserModel();
      this.sellerFormControl.setValue(null);
    }
  }
  
  //#endregion


  openModal() {
    this.isModalOpen = true;
  }

  openClientModal() {
    this.isClientModalOpen = true;
  }

  
  //#region Métodos calculo de total

  // Método para agregar un producto al detalle de la factura
  addProductToInvoice(detalle: DetailInvoiceModel) {
    if(detalle != undefined && detalle != null) {
      const detailsLength = this.detalles.length;

      // Si es el primero de la lista, se le asigna un 0 como id
      if(detailsLength == 0) {
        detalle.IdDetalleFactura = 1;
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


  async handleSave() {
    // Fuente: https://stackoverflow.com/questions/40529817/reactive-forms-mark-fields-as-touched
    // Se marca como tocados a todos los controles para mostrar sus respectivos mensajes de validación
    this.invoiceForm.markAllAsTouched();
    this.wasFormSubmitted = true;
    const invoiceConst = {
      IdFactura: 0,
      FacturaTotal: this.totalInvoice,
      Detalles: this.detalles,
      ...this.invoiceForm.value,
    };

    console.log("invoiceConst:");
    console.log(invoiceConst);

    if (this.invoiceForm.valid && this.detalles.length > 0) {
      console.log('Formulario enviado:', invoiceConst);
      const response = await this.invoiceService.saveInvoice(invoiceConst);

      console.log(response);

      if(response["ResponseCode"] == "000") {
        this.invoiceService.setMostrarMensajeOpFactura(true);
        this.invoiceService.setMensajeOpFactura(response["Message"]);
        this.router.navigate(['/home/invoice'], {
          state: {mostrarMensajeOpFactura: true, mensajeOpFactura: response["Message"]}
        });
      }
    }

    // ENVIAR OBJETO invoice HACIA EL SERVICE DE INVOICE Y QUE ESO LLAME A LA APP
    
  }



}
