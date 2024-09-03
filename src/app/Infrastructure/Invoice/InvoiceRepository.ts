import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IInvoiceRepository } from "../../Domain/Invoice/IInvoiceRepository";
import { InvoiceModel } from "../../Domain/Invoice/InvoiceModel";


export class InvoiceRepositoryImplementation implements IInvoiceRepository {

    async GetInvoices(http: HttpClient, data: InvoiceModel, header: HttpHeaders): Promise<InvoiceModel[] | any> {
      return new Promise((resolve, reject) => {
          http.post("https://localhost:7099/api/Invoice/get_invoices",
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

    async AddInvoice(http: HttpClient, data: InvoiceModel, header: HttpHeaders): Promise<InvoiceModel | any> {
      return new Promise((resolve, reject) => {
          http.post("https://localhost:7099/api/Invoice/add_invoice",
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