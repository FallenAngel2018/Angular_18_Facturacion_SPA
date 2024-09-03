import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { ProductApp } from '../../../../../Application/Product/ProductApp';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductModel } from '../../../../../Domain/Product/ProductModel';

@Component({
  selector: 'app-AddProductModal',
  standalone: true,
  templateUrl: './AddProductModal.component.html',
  imports: [ ReactiveFormsModule, CommonModule ],
  styleUrls: ['./AddProductModal.component.css']
})
export class AddProductModalComponent implements OnInit {
  
  productApp: ProductApp;
  productForm: FormGroup;
  isEditMode: boolean = false;

  // idProductFormControl: AbstractControl;
  codeProductFormControl: AbstractControl;
  nameProductFormControl: AbstractControl;
  priceProductFormControl: AbstractControl;

  @Input() isOpen: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.productApp = new ProductApp();

    this.productForm = new FormGroup({
      CodigoProducto: new FormControl("", [ Validators.required, Validators.minLength(5) ]),
      NombreProducto: new FormControl("", [ Validators.required, Validators.minLength(3) ]),
      PrecioProducto: new FormControl("", [ Validators.required ]),
    });

    this.codeProductFormControl = this.productForm.controls["CodigoProducto"];
    this.nameProductFormControl = this.productForm.controls["NombreProducto"];
    this.priceProductFormControl = this.productForm.controls["PrecioProducto"];
  }


  ngOnInit() {
  }


  close() {
    this.closeModal.emit();
  }

  saveProduct() {
    if (this.productForm.valid) {
      // Obtener los datos del formulario
      const product: ProductModel = this.productForm.value;
      console.log('Product Data:', product);

      const header = new HttpHeaders(
        {
          'Accept': '*/*', // */*  text/plain
          'Content-Type': 'application/json',
          // 'responseType':'json'
        },
      );


      this.productApp.addProduct(this.http, product, header)
      .then(response => {
        console.log("typeof response:");
        console.log(typeof response);
        console.log(response);
      })
      .catch(error => console.error('Error de login:', error));
      
      this.save.emit();
      this.close();
    } else {
      console.log('Form is invalid');
    }
  }
  
  
  
}
