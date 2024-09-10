import { Injectable } from '@angular/core';
import { ProductModel } from '../../../../Domain/Product/ProductModel';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductApp } from '../../../../Application/Product/ProductApp';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  
  // Exponemos el observable para que otros componentes puedan suscribirse
  products$: Observable<ProductModel[]> = this.productsSubject.asObservable();
  // public products$: Observable<ProductModel[]> = this.productsSubject.asObservable();

  constructor(private http: HttpClient, private productApp: ProductApp) {
    this.loadProducts(); // Llama a la carga de productos al instanciar el servicio
  }


  private loadProducts(): void {
    
    const data : ProductModel = { };
    const headers = new HttpHeaders(
      {
        'Accept': '*/*', // */*  text/plain
        'Content-Type': 'application/json',
      },
    );

    // Llamada al método que devuelve una Promise
    const promise = this.productApp.getProducts(this.http, data, headers);

    // Convierte la Promise a Observable
    from(promise).subscribe({
      next: (data) => this.productsSubject.next(data),
      error: (error) => console.error('Error loading products', error),
      complete: () => console.info('complete') 
    });

  }

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
      .catch(error => console.error('Error al ingresar producto (Angular):', error));
  }

}
