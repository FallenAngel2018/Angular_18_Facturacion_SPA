/*

Estos usuarios pueden ingresar facturas que contenga:
    - Identificación del cliente
    - Nombre Cliente
    - Teléfono
    - Correo
    - Vendedor
    - Fecha
    - Forma de pago y
    - Detalles de la Factura (Producto, Cantidad, Precio Unitario, Precio total).
*/

import { DetailInvoiceModel } from "../DetailInvoice/DetailInvoiceModel";


export class InvoiceModel {
    IdFactura?: number;
    IdCliente?: number;
    IdUsuarioVendedor?: number;
    FacturaFecha?: Date; // datetime
    FacturaFormaPago?: number; // int
    FacturaTotal?: number; // decimal](10, 2)
    Detalles?: DetailInvoiceModel[];

    constructor(idFactura?: number, idCliente?: number, idUsuarioVendedor?: number, facturaFecha?: Date,
                    facturaFormaPago?: number, facturaTotal?: number, detalles?: DetailInvoiceModel[]) {
        this.IdFactura = idFactura;
        this.IdCliente = idCliente;
        this.IdUsuarioVendedor = idUsuarioVendedor;
        this.FacturaFecha = facturaFecha;
        this.FacturaFormaPago = facturaFormaPago;
        this.FacturaTotal = facturaTotal;
        this.Detalles = detalles;
    }

    

}