import { Component, OnInit } from '@angular/core';
import { DetailInvoiceModel } from '../../../../../Domain/DetailInvoice/DetailInvoiceModel';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../Services/Invoice.service';
import { AddInvoiceDetailModalComponent } from "../AddInvoiceDetailModal/AddInvoiceDetailModal.component";

@Component({
  selector: 'app-AddInvoice',
  standalone: true,
  templateUrl: './AddInvoice.component.html',
  styleUrls: ['./AddInvoice.component.css'],
  imports: [CommonModule, AddInvoiceDetailModalComponent],
})
export class AddInvoiceComponent implements OnInit {

  todayDate: string;
  isModalOpen = false;
  detalles: DetailInvoiceModel[] = [];

  
  constructor(private invoiceService: InvoiceService) {
    this.todayDate = "";
    this.getCurrentDate();
  }

  ngOnInit() {
    this.invoiceService.detalles$.subscribe(detalles => {
      this.detalles = detalles;
    });
  }

  getCurrentDate() {
    // Obtiene la fecha actual en formato "YYYY-MM-DD"
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
    const dd = String(today.getDate()).padStart(2, '0'); // Día con dos dígitos
    this.todayDate = `${yyyy}-${mm}-${dd}`;
  }

  

  agregarDetalle(detalle: DetailInvoiceModel) {
    this.detalles.push(detalle);
    this.invoiceService.setDetalles(this.detalles);
  }

  openModal() {
    this.isModalOpen = true;
  }

  handleSave(detalleData: any) {
    console.log('Detail Data:', detalleData);
  }

}
