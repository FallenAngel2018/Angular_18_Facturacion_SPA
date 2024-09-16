import { Routes } from '@angular/router';
import { HomeComponent } from './Presentation/Pages/Home/Home.component';
import { LoginComponent } from './Presentation/Pages/Login/Login.component';
import { ClientComponent } from './Presentation/Pages/Client/Client.component';
import { ProductComponent } from './Presentation/Pages/Product/Product.component';
import { InvoiceComponent } from './Presentation/Pages/Invoice/Invoice.component';
import { UserComponent } from './Presentation/Pages/User/User.component';
import { Component } from '@angular/core';
import { AddInvoiceComponent } from './Presentation/Pages/Invoice/components/AddInvoice/AddInvoice.component';
import { AddInvoicePruebaComponent } from './Presentation/Pages/Invoice/components/AddInvoicePrueba/AddInvoicePrueba.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: 'invoice', component: InvoiceComponent },
            // { path: 'add_invoice', component: AddInvoiceComponent },
            { path: 'add_invoice', component: AddInvoicePruebaComponent },
            { path: 'client', component: ClientComponent },
            { path: 'product', component: ProductComponent },
            { path: 'user', component: UserComponent }
        ]
    },
];
