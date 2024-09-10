import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InvoiceService } from '../../Services/Invoice.service';
import { DetailInvoiceModel } from '../../../../../Domain/DetailInvoice/DetailInvoiceModel';
import { CommonModule } from '@angular/common';
import { InvoiceApp } from '../../../../../Application/Invoice/InvoiceApp';
import { ProductModel } from '../../../../../Domain/Product/ProductModel';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductApp } from '../../../../../Application/Product/ProductApp';

@Component({
  selector: 'app-AddInvoiceDetailModal',
  standalone: true,
  templateUrl: './AddInvoiceDetailModal.component.html',
  styleUrls: ['./AddInvoiceDetailModal.component.css'],
  imports: [ ReactiveFormsModule, FormsModule, CommonModule ],
  providers: [ InvoiceApp, ProductApp ]
})
export class AddInvoiceDetailModalComponent implements OnInit {

  isModalOpen = false;
  isEditMode: boolean = false;
  detailInvoiceForm: FormGroup;
  detailInvoiceObj: DetailInvoiceModel = new DetailInvoiceModel();
  detalles: DetailInvoiceModel[] = [];
  products: ProductModel[] = [];

  @Input() isOpen: boolean = false;
  @Output() detailCreated = new EventEmitter<DetailInvoiceModel>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter();


  idDetailFormControl: AbstractControl;
  idProductFormControl: AbstractControl;
  quantityFormControl: AbstractControl;
  unitPriceProductFormControl: AbstractControl;
  

  constructor(private invoiceService: InvoiceService, private http: HttpClient, private productApp: ProductApp) {
    this.detailInvoiceForm = new FormGroup({
      IdDetalleFactura: new FormControl(""),
      IdFactura: new FormControl(""),
      IdProducto: new FormControl(""),
      NombreProducto: new FormControl(""),
      Cantidad: new FormControl(""),
      PrecioUnitario: new FormControl(""),
    });


    this.idDetailFormControl = this.detailInvoiceForm.controls["IdDetalle"];
    this.idProductFormControl = this.detailInvoiceForm.controls["IdProducto"];
    this.quantityFormControl = this.detailInvoiceForm.controls["Cantidad"];
    this.unitPriceProductFormControl = this.detailInvoiceForm.controls["Precio"];
  }

  ngOnInit() {
    // this.invoiceService.detalles$.subscribe(detalles => {
    //   this.detalles = detalles;
    // });

    const data : ProductModel = { };
    const headers = new HttpHeaders(
      {
        'Accept': '*/*', // */*  text/plain
        'Content-Type': 'application/json',
      },
    );

    this.productApp.getProducts(this.http, data, headers)
      .then(productsResponse => {
        console.log("typeof response:");
        console.log(typeof productsResponse);
        console.log(productsResponse);

        for (let i = 0; i < productsResponse.length; i++) {
          const product = productsResponse[i];

          this.detalles.push( new DetailInvoiceModel(i, 1, product, 1, 0.0) );
        }


        return productsResponse;
      })
      .catch(error => console.error('Error:', error));
    
    
  }

  // Método para agregar un producto al detalle de la factura
  addProductToInvoice(detalle: DetailInvoiceModel) {
    if(detalle != undefined && detalle != null) {
      // USAR SERVICIO PARA OBTENER LISTA ACTUAL
      const total = (detalle.Cantidad! * detalle.Producto!.PrecioProducto!);

      const detail: DetailInvoiceModel = {
        IdDetalleFactura: detalle.IdDetalleFactura,
        Producto: detalle.Producto,
        Cantidad: detalle.Cantidad,
        PrecioUnitario: detalle.Producto?.PrecioProducto,
        Total: total
      };

      this.detailCreated.emit(detail);
    }
    
  }


  close() {
    this.closeModal.emit();
  }

  


}

type ExtractFormControl<T> = {
  [K in keyof T]: T[K] extends FormControl<infer U> ? U : T[K]
}
