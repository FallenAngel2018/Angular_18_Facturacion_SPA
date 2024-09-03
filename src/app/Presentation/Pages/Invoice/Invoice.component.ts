import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InvoiceModel } from '../../../Domain/Invoice/InvoiceModel';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { InvoiceApp } from '../../../Application/Invoice/InvoiceApp';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Invoice',
  standalone: true,
  templateUrl: './Invoice.component.html',
  styleUrls: ['./Invoice.component.css'],
  imports: [ RouterLink, RouterOutlet, CommonModule ],
  providers: [ InvoiceApp ],
})
export class InvoiceComponent implements OnInit {
  
  todayDate: string;
  facturas: InvoiceModel[] = [];

  
  constructor(private http: HttpClient, private router: Router, private invoiceApp: InvoiceApp) {
    this.todayDate = "";
    this.getCurrentDate();
  }

  async ngOnInit() {

    // Suscribirse al observable para recibir cambios en la lista de productos
    // this.productService.products$.subscribe(products => {
    //   this.productos = products;
    // });

    const data : InvoiceModel = { };
    const headers = new HttpHeaders(
      {
        'Accept': '*/*', // */*  text/plain
        'Content-Type': 'application/json',
      },
    );

    this.facturas = await this.invoiceApp.getInvoices(this.http, data, headers)
      .then(response => {
        console.log("typeof response:");
        console.log(typeof response);
        console.log(response);

        return response;
      })
      .catch(error => console.error('Error:', error));

    console.log(this.facturas);
    // console.log(this.facturas[1]);
    
    


  }

  getCurrentDate() {
    // Obtiene la fecha actual en formato "YYYY-MM-DD"
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
    const dd = String(today.getDate()).padStart(2, '0'); // Día con dos dígitos
    this.todayDate = `${yyyy}-${mm}-${dd}`;
  }

  navigateToNewInvoice() {
    this.router.navigate(['/home/add_invoice']);
  }

}
