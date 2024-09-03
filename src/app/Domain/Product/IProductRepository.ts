import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductModel } from "./ProductModel";


// Fuente: https://stackoverflow.com/questions/59313995/typescript-interface-method-implementation
export interface IProductRepository
{
    GetProducts: (http: HttpClient, data: ProductModel, header: HttpHeaders) => Promise<ProductModel[] | any>;
    AddProduct: (http: HttpClient, data: ProductModel, header: HttpHeaders) => Promise<ProductModel | any>;
}
