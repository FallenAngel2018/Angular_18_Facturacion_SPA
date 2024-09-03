import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../../Domain/User/UserModel";
import { IUserRepository } from "../../Domain/User/IUserRepository";


export class UserRepositoryImplementation implements IUserRepository {

    async RequestLogin(http: HttpClient, data: UserModel, header: HttpHeaders): Promise<boolean | any> {
      return new Promise((resolve, reject) => {
          http.post("https://localhost:7099/api/User/request_login",
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