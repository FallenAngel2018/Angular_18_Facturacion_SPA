import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IUserRepository } from "../../Domain/User/IUserRepository";
import { UserRepositoryImplementation } from "../../Infrastructure/User/UserRepository";
import { UserModel } from "../../Domain/User/UserModel";

export class UserApp {
    private userRepository: IUserRepository;

    constructor() {
        // Se instancia la implementación para no tener que pasarle al contructor
        // un repositorio cada vez que se quiera generar una instancia de esta clase,
        // y así tratar de aislar, separar y organizar el código de forma más independiente
        this.userRepository = new UserRepositoryImplementation();
    }
    

    // Método definido con función flecha para mantener el contexto de `this`
    login = (http: HttpClient, data: UserModel, headers: HttpHeaders): Promise<boolean | any> => {
        return this.userRepository.RequestLogin(http, data, headers);
    }

}