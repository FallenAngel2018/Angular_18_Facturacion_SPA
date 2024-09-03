import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "./UserModel";


// Fuente: https://stackoverflow.com/questions/59313995/typescript-interface-method-implementation
export interface IUserRepository
{
    RequestLogin: (http: HttpClient, data: UserModel, header: HttpHeaders) => Promise<boolean | any>;
}
