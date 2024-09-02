import { Routes } from '@angular/router';
import { HomeComponent } from './Presentation/Pages/Home/Home.component';
import { LoginComponent } from './Presentation/Pages/Login/Login.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent}
];
