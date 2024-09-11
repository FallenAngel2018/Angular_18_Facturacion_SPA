import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../Domain/User/UserModel';
import { UserApp } from '../../../Application/User/UserApp';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddUserModalComponent } from './components/AddUserModal/AddUserModal.component';
import { UserTypePipe } from './pipes/UserType.pipe';


@Component({
  selector: 'app-User',
  standalone: true,
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.scss'],
  imports: [ CommonModule, AddUserModalComponent, UserTypePipe ],
  providers: [ UserApp ],
})
export class UserComponent implements OnInit {

  usuarios: UserModel[] = [];

  // Campos para modal
  isModalOpen = false;
  isEditMode: boolean = false;
  selectedUser: UserModel = new UserModel();

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
    this.selectedUser = new UserModel();
  }

  openEditModal(user: UserModel): void {
    console.log("openEditModal(user: UserModel) ejecutado - Usuario:");
    console.log(user);
    
    this.selectedUser = user;
    this.isEditMode = true;
    this.isModalOpen = true;
  }

}
