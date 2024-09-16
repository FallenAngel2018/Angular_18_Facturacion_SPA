import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../Domain/Product/ProductModel';
import { ProductApp } from '../../../Application/Product/ProductApp';
import { AddProductModalComponent } from './components/AddProductModal/AddProductModal.component';
import { CommonModule } from '@angular/common';
import { ProductService } from './Services/Product.service';

@Component({
  selector: 'app-Product',
  standalone: true,
  templateUrl: './Product.component.html',
  imports:[ AddProductModalComponent, CommonModule ],
  styleUrls: ['./Product.component.css'],
  providers: [ ProductApp, ProductService ]
})
export class ProductComponent implements OnInit {

  isModalOpen = false;
  productos: ProductModel[] = [];
  selectedProduct: ProductModel | null = null;
  isEditMode: boolean = false;

  constructor(private http: HttpClient, private productApp: ProductApp, private productService: ProductService) {
  }

  async ngOnInit() {
    // Suscribirse al observable para recibir cambios en la lista de productos
    this.productService.products$.subscribe(products => {
      this.productos = products;
    });

  }



  openModal() {
    this.isModalOpen = true;
  }

  openEditModal(product: ProductModel): void {
    this.isEditMode = true;
    this.selectedProduct = product;
    // this.productForm.patchValue({
    //   CodigoProducto: product.CodigoProducto,
    //   NombreProducto: product.NombreProducto,
    //   PrecioProducto: product.PrecioProducto
    // });
    // Lógica para abrir el modal
    const modal = document.getElementById('productModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  handleSave(productData: any) {
    // Handle saving the product data here
    console.log('Product Data:', productData);
  }

  


}
