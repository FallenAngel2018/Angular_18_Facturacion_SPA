import { Component, OnInit } from '@angular/core';
import { DetailInvoiceModel } from '../../../../../Domain/DetailInvoice/DetailInvoiceModel';

@Component({
  selector: 'app-AddInvoice',
  standalone: true,
  templateUrl: './AddInvoice.component.html',
  styleUrls: ['./AddInvoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  detalles: DetailInvoiceModel[] = [  ];

  
  constructor() { }

  ngOnInit() {
  }

}
