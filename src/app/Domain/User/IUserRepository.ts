import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "./UserModel";
import { LoginResponseModel } from "../Login/LoginResponseModel";
import { UserResponseModel } from "./UserResponseModel";


// Fuente: https://stackoverflow.com/questions/59313995/typescript-interface-method-implementation
export interface IUserRepository
{
    RequestLogin: (http: HttpClient, data: UserModel, header: HttpHeaders) => Promise<LoginResponseModel | any>;
    GetUsers: (http: HttpClient, data: UserModel, header: HttpHeaders) => Promise<UserModel[] | any>;
    AddUser: (http: HttpClient, data: UserModel, header: HttpHeaders) => Promise<UserModel | any>;
    UpdateUser: (http: HttpClient, data: UserModel, header: HttpHeaders) => Promise<UserResponseModel | any>;
}
