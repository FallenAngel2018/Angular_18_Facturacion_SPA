import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../../Domain/User/UserModel";
import { IUserRepository } from "../../Domain/User/IUserRepository";
import { LoginResponseModel } from "../../Domain/Login/LoginResponseModel";
import { ConfigEnv } from "../../Utils/ConfigEnv";
import { UserResponseModel } from "../../Domain/User/UserResponseModel";


export class UserRepositoryImplementation implements IUserRepository {

  private apiEnv: string = ConfigEnv.ENVIRONMENT;
  private entityRoute: string = "/api/User";


  async RequestLogin(http: HttpClient, data: UserModel, header: HttpHeaders): Promise<LoginResponseModel | any> {
    
    const entityAction: string = "/request_login";

    return new Promise((resolve, reject) => {
      http.post(this.apiEnv + this.entityRoute + entityAction, // https://localhost:5001 :7099
        data, { headers: header }
      ).subscribe({
        next: (response) => {
          console.log("post next pasa primero");
          console.log(response);

          resolve(response);
        },
        error: (error) => { // errorHandler 
          console.log(`post error: ${error}`);

          reject(error);
        },
      });
    });
  }

  
  async GetUsers(http: HttpClient, data: UserModel, header: HttpHeaders): Promise<UserModel[] | any> {
    const entityAction: string = "/get_users";

    return new Promise((resolve, reject) => {
        http.post<UserModel[]>(this.apiEnv + this.entityRoute + entityAction,
          data, { headers: header }
        ).subscribe({
          next: (response) => {

            console.log("post next pasa primero");
            console.log(response);

            resolve(response);
          },
          error: (error) => { // errorHandler 
            console.log(`post error: ${error}`);
            console.log(error);

            reject(error);
          },
        });
    });
  }

  async AddUser(http: HttpClient, data: UserModel, header: HttpHeaders): Promise<UserModel | any> {
    const entityAction: string = "/add_user";

    return new Promise((resolve, reject) => {
        http.post(this.apiEnv + this.entityRoute + entityAction,
          data, { headers: header }
        ).subscribe({
          next: (response) => {
            console.log("post next pasa primero");
            console.log(response);

            resolve(response);
          },
          error: (error) => { // errorHandler 
            console.log(`post error: ${error}`);

            reject(error);
          },
        });
    });
  }

  async UpdateUser(http: HttpClient, data: UserModel, header: HttpHeaders): Promise<UserModel | any> {
    const entityAction: string = "/update_user";

    return new Promise((resolve, reject) => {
        http.put<UserResponseModel>(this.apiEnv + this.entityRoute + entityAction,
          data, { headers: header }
        ).subscribe({
          next: (response) => {
            console.log("post next pasa primero");
            console.log(response);

            resolve(response);
          },
          error: (error) => { // errorHandler 
            console.log(`post error: ${error}`);

            reject(error);
          },
        });
    });
  }
  

    
}