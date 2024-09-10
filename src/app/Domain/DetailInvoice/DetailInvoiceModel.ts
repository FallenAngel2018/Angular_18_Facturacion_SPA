import { ProductModel } from "../Product/ProductModel";

export class DetailInvoiceModel {
    // IdDetalleFactura?: number;
    // IdFactura?: number;
    // IdProducto?: number;
    // CodigoProducto?: string
    // NombreProducto?: string
    // Cantidad?: number;
    // PrecioUnitario?: number;
    // Total?: number;

    // Forma simplificada
    constructor(public IdDetalleFactura?: number, public IdFactura?: number,
        public Producto?: ProductModel,
        public Cantidad?: number, public PrecioUnitario?: number, public Total?: number) { }
    

}