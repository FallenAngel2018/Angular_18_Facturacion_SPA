import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IUserRepository } from "../../Domain/User/IUserRepository";
import { UserRepositoryImplementation } from "../../Infrastructure/User/UserRepository";
import { UserModel } from "../../Domain/User/UserModel";
import { LoginResponseModel } from "../../Domain/Login/LoginResponseModel";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root', // O puedes hacerlo en un módulo específico
})
export class UserApp {
    private userRepository: IUserRepository;

    constructor() {
        // Se instancia la implementación para no tener que pasarle al contructor
        // un repositorio cada vez que se quiera generar una instancia de esta clase,
        // y así tratar de aislar, separar y organizar el código de forma más independiente
        this.userRepository = new UserRepositoryImplementation();
    }
    

    // Método definido con función flecha para mantener el contexto de `this`
    login = (http: HttpClient, data: UserModel, headers: HttpHeaders): Promise<LoginResponseModel | any> => { // boolean
        return this.userRepository.RequestLogin(http, data, headers);
    }

    getUsers = (http: HttpClient, data: UserModel, headers: HttpHeaders): Promise<UserModel[] | any> => {
        return this.userRepository.GetUsers(http, data, headers);
    }

    addUser = (http: HttpClient, data: UserModel, headers: HttpHeaders): Promise<UserModel | any> => {
        return this.userRepository.AddUser(http, data, headers);
    }

    updateUser = (http: HttpClient, data: UserModel, headers: HttpHeaders): Promise<UserModel | any> => {
        return this.userRepository.UpdateUser(http, data, headers);
    }

}