import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IProductRepository } from "../../Domain/Product/IProductRepository";
import { ProductModel } from "../../Domain/Product/ProductModel";
import { ConfigEnv } from "../../Utils/ConfigEnv";


export class ProductRepositoryImplementation implements IProductRepository {

  private apiEnv: string = ConfigEnv.ENVIRONMENT;
  private entityRoute: string = "/api/Product";


  async GetProducts(http: HttpClient, data: ProductModel, header: HttpHeaders): Promise<ProductModel[] | any> {
    const entityAction: string = "/get_products";

    return new Promise((resolve, reject) => {
        http.post(this.apiEnv + this.entityRoute + entityAction,
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
    const entityAction: string = "/add_product";

    return new Promise((resolve, reject) => {
        http.post(this.apiEnv + this.entityRoute + entityAction,
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