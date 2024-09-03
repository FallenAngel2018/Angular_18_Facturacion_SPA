import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InvoiceService } from '../../Services/Invoice.service';
import { DetailInvoiceModel } from '../../../../../Domain/DetailInvoice/DetailInvoiceModel';
import { CommonModule } from '@angular/common';
import { InvoiceApp } from '../../../../../Application/Invoice/InvoiceApp';
import { ProductModel } from '../../../../../Domain/Product/ProductModel';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-AddInvoiceDetailModal',
  standalone: true,
  templateUrl: './AddInvoiceDetailModal.component.html',
  styleUrls: ['./AddInvoiceDetailModal.component.css'],
  imports: [ ReactiveFormsModule, CommonModule ],
  providers: [ InvoiceApp ]
})
export class AddInvoiceDetailModalComponent implements OnInit {

  isModalOpen = false;
  isEditMode: boolean = false;
  detailInvoiceForm: FormGroup;
  detalles: DetailInvoiceModel[] = [];
  products: ProductModel[] = [];
  @Input() isOpen: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();


  idDetailFormControl: AbstractControl;
  idProductFormControl: AbstractControl;
  quantityFormControl: AbstractControl;
  unitPriceProductFormControl: AbstractControl;


  constructor(private invoiceService: InvoiceService) {
    this.detailInvoiceForm = new FormGroup({
      IdDetalle: new FormControl(""),
      IdProducto: new FormControl(""),
      Cantidad: new FormControl(""),
      Precio: new FormControl(""),
    });

    this.idDetailFormControl = this.detailInvoiceForm.controls["IdDetalle"];
    this.idProductFormControl = this.detailInvoiceForm.controls["IdProducto"];
    this.quantityFormControl = this.detailInvoiceForm.controls["Cantidad"];
    this.unitPriceProductFormControl = this.detailInvoiceForm.controls["Precio"];
  }

  ngOnInit() {
    this.invoiceService.detalles$.subscribe(detalles => {
      this.detalles = detalles;
    });
  }

  // Método para agregar un producto al detalle de la factura
  addProductToInvoice(detalle: DetailInvoiceModel) {
    if(detalle != undefined && detalle != null) {
      var detalle: DetailInvoiceModel = {
        IdDetalleFactura: detalle.IdDetalleFactura,
        IdProducto: detalle.IdProducto,
        Cantidad: detalle.Cantidad,
        PrecioUnitario: detalle.PrecioUnitario
      };
      this.detalles.push(detalle);
    }
    
  }


  close() {
    this.closeModal.emit();
  }


}
