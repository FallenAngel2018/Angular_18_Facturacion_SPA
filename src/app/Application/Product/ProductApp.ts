import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IProductRepository } from "../../Domain/Product/IProductRepository";
import { ProductModel } from "../../Domain/Product/ProductModel";
import { ProductRepositoryImplementation } from "../../Infrastructure/Product/ProductRepository";

export class ProductApp {
    private productRepository: IProductRepository;

    constructor() {
        // Se instancia la implementación para no tener que pasarle al contructor
        // un repositorio cada vez que se quiera generar una instancia de esta clase,
        // y así tratar de aislar, separar y organizar el código de forma más independiente
        this.productRepository = new ProductRepositoryImplementation();
    }
    

    getProducts = (http: HttpClient, data: ProductModel, headers: HttpHeaders): Promise<ProductModel[] | any> => {
        return this.productRepository.GetProducts(http, data, headers);
    }

    addProduct = (http: HttpClient, data: ProductModel, headers: HttpHeaders): Promise<ProductModel | any> => {
        return this.productRepository.AddProduct(http, data, headers);
    }


}