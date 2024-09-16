import { HttpClient, HttpHeaders } from "@angular/common/http";
import { InvoiceModel } from "../../Domain/Invoice/InvoiceModel";
import { IInvoiceRepository } from "../../Domain/Invoice/IInvoiceRepository";
import { InvoiceRepositoryImplementation } from "../../Infrastructure/Invoice/InvoiceRepository";
import { Injectable } from "@angular/core";
import { InvoiceResponseModel } from "../../Domain/Invoice/InvoiceResponseModel";

@Injectable({
    providedIn: 'root',
})
export class InvoiceApp {
    private invoiceRepository: IInvoiceRepository;

    constructor() {
        // Se instancia la implementación para no tener que pasarle al contructor
        // un repositorio cada vez que se quiera generar una instancia de esta clase,
        // y así tratar de aislar, separar y organizar el código de forma más independiente
        this.invoiceRepository = new InvoiceRepositoryImplementation();
    }
    

    getInvoices = (http: HttpClient, data: InvoiceModel, headers: HttpHeaders): Promise<InvoiceModel[] | any> => {
        return this.invoiceRepository.GetInvoices(http, data, headers);
    }

    addInvoice = (http: HttpClient, data: InvoiceModel, headers: HttpHeaders): Promise<InvoiceResponseModel | any> => {
        return this.invoiceRepository.AddInvoice(http, data, headers);
    }


}