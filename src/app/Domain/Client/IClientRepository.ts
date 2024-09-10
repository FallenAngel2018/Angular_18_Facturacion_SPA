import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClientModel } from "./ClientModel";


// Fuente: https://stackoverflow.com/questions/59313995/typescript-interface-method-implementation
export interface IClientRepository
{
    GetClients: (http: HttpClient, data: ClientModel, header: HttpHeaders) => Promise<ClientModel[] | any>;
    AddClient: (http: HttpClient, data: ClientModel, header: HttpHeaders) => Promise<ClientModel | any>;
}