import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DetailInvoiceModel } from '../../../../Domain/DetailInvoice/DetailInvoiceModel';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private detallesSubject = new BehaviorSubject<DetailInvoiceModel[]>([]);
  detalles$ = this.detallesSubject.asObservable();

  setDetalles(detalles: DetailInvoiceModel[]) {
    this.detallesSubject.next(detalles);
  }

  getDetalles(): DetailInvoiceModel[] {
    return this.detallesSubject.value;
  }

}
