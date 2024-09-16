import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../../../Domain/Client/ClientModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientApp } from '../../../Application/Client/ClientApp';
import { CommonModule } from '@angular/common';
import { AddClientModalComponent } from "./components/AddClientModal/AddClientModal.component";

@Component({
  selector: 'app-Client',
  standalone: true,
  templateUrl: './Client.component.html',
  styleUrls: ['./Client.component.scss'],
  imports: [ CommonModule, AddClientModalComponent ],
  providers: [ ClientApp ],
})
export class ClientComponent implements OnInit {

  clientes: ClientModel[] = [];

  // Campos para modal
  isModalOpen = false;
  isEditMode: boolean = false;
  selectedClient: ClientModel | null = null;

  constructor(private http: HttpClient, private clientApp: ClientApp) { }

  async ngOnInit() {// Suscribirse al observable para recibir cambios en la lista de productos
    // this.productService.products$.subscribe(products => {
    //   this.productos = products;
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
        return response;
      })
      .catch(error => console.error('Error:', error));
  }

  openModal() {
    this.isModalOpen = true;
  }

  openEditModal(client: ClientModel): void {
    this.isEditMode = true;
    this.selectedClient = client;
    // this.productForm.patchValue({
    //   CodigoProducto: product.CodigoProducto,
    //   NombreProducto: product.NombreProducto,
    //   PrecioProducto: product.PrecioProducto
    // });
    // Lógica para abrir el modal
    const modal = document.getElementById('clientModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

}
