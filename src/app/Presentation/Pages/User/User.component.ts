import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../Domain/User/UserModel';
import { UserApp } from '../../../Application/User/UserApp';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddUserModalComponent } from './components/AddUserModal/AddUserModal.component';

@Component({
  selector: 'app-User',
  standalone: true,
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.scss'],
  imports: [ CommonModule, AddUserModalComponent ],
  providers: [ UserApp ],
})
export class UserComponent implements OnInit {

  usuarios: UserModel[] = [];

  // Campos para modal
  isModalOpen = false;
  isEditMode: boolean = false;
  selectedUser: UserModel | null = null;

  constructor(private http: HttpClient, private userApp: UserApp) { }

  async ngOnInit() {
    const data : UserModel = { };
    const headers = new HttpHeaders(
      {
        'Accept': '*/*', // */*  text/plain
        'Content-Type': 'application/json',
      },
    );

    this.usuarios = await this.userApp.getUsers(this.http, data, headers)
      .then(response => {
        console.log("typeof response:");
        console.log(typeof response);
        console.log(response);

        return response;
      })
      .catch(error => console.error('Error:', error));
  }

  openModal() {
    this.isModalOpen = true;
  }

  openEditModal(user: UserModel): void {
    this.isEditMode = true;
    this.selectedUser = user;
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

    this.isModalOpen = true;
  }

}
