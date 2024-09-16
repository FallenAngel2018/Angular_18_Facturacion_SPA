import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IInvoiceRepository } from "../../Domain/Invoice/IInvoiceRepository";
import { InvoiceModel } from "../../Domain/Invoice/InvoiceModel";
import { ConfigEnv } from "../../Utils/ConfigEnv";
import { InvoiceResponseModel } from "../../Domain/Invoice/InvoiceResponseModel";


export class InvoiceRepositoryImplementation implements IInvoiceRepository {

  private apiEnv: string = ConfigEnv.ENVIRONMENT;
  private entityRoute: string = "/api/Invoice";
  

  async GetInvoices(http: HttpClient, data: InvoiceModel, header: HttpHeaders): Promise<InvoiceModel[] | any> {
    const entityAction: string = "/get_invoices";

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

  async AddInvoice(http: HttpClient, data: InvoiceModel, header: HttpHeaders): Promise<InvoiceResponseModel | any> {
    const entityAction: string = "/add_invoice";

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