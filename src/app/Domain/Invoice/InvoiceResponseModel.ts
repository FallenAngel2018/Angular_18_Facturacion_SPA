import { InvoiceModel } from "./InvoiceModel";

export class InvoiceResponseModel {
    constructor(public ResponseCode?: string, public Message?: string,
        public Invoice?: InvoiceModel, public Invoices?: InvoiceModel[],) { }
}