import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DetailInvoiceModel } from '../../../../Domain/DetailInvoice/DetailInvoiceModel';
import { UserModel } from '../../../../Domain/User/UserModel';
import { ClientModel } from '../../../../Domain/Client/ClientModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserApp } from '../../../../Application/User/UserApp';
import { ClientApp } from '../../../../Application/Client/ClientApp';
import { InvoiceModel } from '../../../../Domain/Invoice/InvoiceModel';
import { InvoiceApp } from '../../../../Application/Invoice/InvoiceApp';

/*
  Prompt: Voy a crear un servicio similar para InvoiceComponent, este tendrá 3 listas, 
  usuarios: UserModel[], detalles: DetailInvoiceModel[], y clientes: ClientModel[],
  por el momento solo debo definir estas listas
*/
@Injectable({
  providedIn: 'root',
})
export class InvoiceService {

  private clientesSubject = new BehaviorSubject<ClientModel[]>([]);
  clientes$ = this.clientesSubject.asObservable();
  private vendedoresSubject = new BehaviorSubject<UserModel[]>([]);
  vendedores$ = this.vendedoresSubject.asObservable();
  private detallesSubject = new BehaviorSubject<DetailInvoiceModel[]>([]);
  detalles$ = this.detallesSubject.asObservable();
  
  // #region Subjects/Observables - AddInvoiceComponent -> InvoiceComponent
  
  // Se usan al momento de ingresar una factura
  private mostrarMensajeOpFacturaSubject = new BehaviorSubject<boolean>(false);
  // Exponerlo como observable
  mostrarMensajeOpFactura$ = this.mostrarMensajeOpFacturaSubject.asObservable();
  private mensajeOpFacturaSubject = new BehaviorSubject<string>("");
  // Exponerlo como observable
  mensajeOpFactura$ = this.mensajeOpFacturaSubject.asObservable();

  // #endregion


  constructor(private http: HttpClient, private userApp: UserApp, private clientApp: ClientApp, private invoiceApp: InvoiceApp) {
  }

  // #region Get y Set observables - AddInvoiceComponent -> InvoiceComponent

  // Método para obtener el valor actual
  getMostrarMensajeOpFactura(): boolean {
    return this.mostrarMensajeOpFacturaSubject.value;
  }

  // Método para establecer un nuevo valor
  setMostrarMensajeOpFactura(value: boolean): void {
    this.mostrarMensajeOpFacturaSubject.next(value);
  }

  // Método para obtener el valor actual
  getMensajeOpFactura(): string {
    return this.mensajeOpFacturaSubject.value;
  }

  // Método para establecer un nuevo valor
  setMensajeOpFactura(value: string): void {
    this.mensajeOpFacturaSubject.next(value);
  }

  resetOpFacturaValues(): void {
    this.mostrarMensajeOpFacturaSubject.next(false);
    this.mensajeOpFacturaSubject.next("");
  }

  // #endregion


  async loadSellers(): Promise<UserModel[]> {
    const data : UserModel = new UserModel(0, "", "", "", 1); // Tipo Vendedor = 1
    const headers = new HttpHeaders(
      {
        'Accept': '*/*', // */*  text/plain
        'Content-Type': 'application/json',
      },
    );

    const usuarios = await this.userApp.getUsers(this.http, data, headers)
      .then(response => {
        console.log("userApp.getUsers() response:");
        console.log(response);

        return response;
      })
      .catch(error => console.error('Error:', error));

    this.vendedoresSubject.next(usuarios);

    return this.vendedoresSubject.value;
  }

  getVendedores(): UserModel[] {
    return this.vendedoresSubject.value;
  }

  // Métodos para manejar los clientes
  async loadClients(): Promise<ClientModel[]> {
    const data : ClientModel = new ClientModel();
    const headers = new HttpHeaders(
      {
        'Accept': '*/*', // */*  text/plain
        'Content-Type': 'application/json',
      },
    );

    const clientes = await this.clientApp.getClients(this.http, data, headers)
      .then(response => {
        console.log("clientApp.getClients() response:");
        console.log(response);

        return response;
      })
      .catch(error => console.error('Error:', error));

    // this.clientesSubject.next(clientes);
    this.setClientes(clientes);

    return clientes;
  }

  getClientes(): ClientModel[] {
    return this.clientesSubject.value;
  }

  setClientes(clientes: ClientModel[]) {
    this.clientesSubject.next(clientes);
  }

  

  // Métodos para manejar los detalles
  setDetalles(detalles: DetailInvoiceModel[]) {
    this.detallesSubject.next(detalles);
  }

  getDetalles(): DetailInvoiceModel[] {
    return this.detallesSubject.value;
  }


  async saveInvoice(data: InvoiceModel) {
    // const data : ClientModel = new ClientModel();
    const headers = new HttpHeaders(
      {
        'Accept': '*/*', // */*  text/plain
        'Content-Type': 'application/json',
      },
    );

    const invoiceResponse = await this.invoiceApp.addInvoice(this.http, data, headers)
      .then(response => {
        console.log("invoiceApp.addInvoice() response:");
        console.log(response);

        return response;
      })
      .catch(error => {
        console.error('Error:');
        console.error(error);

        return error;
      });

    return invoiceResponse;
  }


}
