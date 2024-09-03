import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IProductRepository } from "../../Domain/Product/IProductRepository";
import { ProductModel } from "../../Domain/Product/ProductModel";


export class ProductRepositoryImplementation implements IProductRepository {

    async GetProducts(http: HttpClient, data: ProductModel, header: HttpHeaders): Promise<ProductModel[] | any> {
      return new Promise((resolve, reject) => {
          http.post("https://localhost:7099/api/Product/get_products",
            data, { headers: header }
          ).subscribe({
            next: (response) => {

              console.log("post next pasa primero");
              console.log(response);
  
              resolve(response);
            },
            error: (error) => { // errorHandler 
              console.log(`post error: ${error}`);
              console.log(error);
  
              reject(error);
            },
          });
      });
    }

    async AddProduct(http: HttpClient, data: ProductModel, header: HttpHeaders): Promise<ProductModel | any> {
      return new Promise((resolve, reject) => {
          http.post("https://localhost:7099/api/Product/add_product",
            data, { headers: header }
          ).subscribe({
            next: (response) => {
              console.log("post next pasa primero");
              console.log(response);
  
              resolve(response);
            },
            error: (error) => { // errorHandler 
              console.log(`post error: ${error}`);
  
              reject(error);
            },
          });
      });
    }
  
    
}