import { Injectable } from '@angular/core';
import { ProductModel } from '../../../../Domain/Product/ProductModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  
  // Exponemos el observable para que otros componentes puedan suscribirse
  products$: Observable<ProductModel[]> = this.productsSubject.asObservable();

  constructor() { }


  // Método para obtener el arreglo actual
  getProducts(): ProductModel[] {
    return this.productsSubject.value;
  }

  // Método para actualizar el arreglo de productos
  setProducts(products: ProductModel[]): void {
    this.productsSubject.next(products);
  }

  // Método para agregar un nuevo producto
  addProduct(product: ProductModel): void {
    const currentProducts = this.getProducts();
    this.setProducts([...currentProducts, product]);
  }

}
