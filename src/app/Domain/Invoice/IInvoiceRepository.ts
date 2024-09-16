import { HttpClient, HttpHeaders } from "@angular/common/http";
import { InvoiceModel } from "./InvoiceModel";
import { InvoiceResponseModel } from "./InvoiceResponseModel";


// Fuente: https://stackoverflow.com/questions/59313995/typescript-interface-method-implementation
export interface IInvoiceRepository
{
    GetInvoices: (http: HttpClient, data: InvoiceModel, header: HttpHeaders) => Promise<InvoiceModel[] | any>;
    AddInvoice: (http: HttpClient, data: InvoiceModel, header: HttpHeaders) => Promise<InvoiceResponseModel | any>;
}