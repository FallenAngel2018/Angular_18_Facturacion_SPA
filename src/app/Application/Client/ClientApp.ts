import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClientModel } from "../../Domain/Client/ClientModel";
import { IClientRepository } from "../../Domain/Client/IClientRepository";
import { ClientRepositoryImplementation } from "../../Infrastructure/Client/ClientRepository";

export class ClientApp {
    private clientRepository: IClientRepository;

    constructor() {
        // Se instancia la implementación para no tener que pasarle al contructor
        // un repositorio cada vez que se quiera generar una instancia de esta clase,
        // y así tratar de aislar, separar y organizar el código de forma más independiente
        this.clientRepository = new ClientRepositoryImplementation();
    }
    

    getClients = (http: HttpClient, data: ClientModel, headers: HttpHeaders): Promise<ClientModel[] | any> => {
        return this.clientRepository.GetClients(http, data, headers);
    }

    addClient = (http: HttpClient, data: ClientModel, headers: HttpHeaders): Promise<ClientModel | any> => {
        return this.clientRepository.AddClient(http, data, headers);
    }


}