import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClientModel } from "../../Domain/Client/ClientModel";
import { IClientRepository } from "../../Domain/Client/IClientRepository";
import { ConfigEnv } from "../../Utils/ConfigEnv";


export class ClientRepositoryImplementation implements IClientRepository {

  private apiEnv: string = ConfigEnv.ENVIRONMENT;
  private entityRoute: string = "/api/Client";


  async GetClients(http: HttpClient, data: ClientModel, header: HttpHeaders): Promise<ClientModel[] | any> {
    const entityAction: string = "/get_clients";

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
            console.log(error);

            reject(error);
          },
        });
    });
  }

  async AddClient(http: HttpClient, data: ClientModel, header: HttpHeaders): Promise<ClientModel | any> {
    const entityAction: string = "/add_client";
    
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
  
    
}