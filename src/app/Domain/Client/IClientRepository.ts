import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClientModel } from "./ClientModel";
import { ClientResponseModel } from "./ClientResponseModel";


// Fuente: https://stackoverflow.com/questions/59313995/typescript-interface-method-implementation
export interface IClientRepository
{
    GetClients: (http: HttpClient, data: ClientModel, header: HttpHeaders) => Promise<ClientModel[] | any>;
    AddClient: (http: HttpClient, data: ClientModel, header: HttpHeaders) => Promise<ClientResponseModel | any>;
    // AddClient: (http: HttpClient, data: ClientModel, header: HttpHeaders) => Promise<ClientModel | any>;
}