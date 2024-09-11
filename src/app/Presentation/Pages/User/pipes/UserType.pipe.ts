import { Pipe, PipeTransform } from '@angular/core';


// Fuente: https://stackoverflow.com/questions/77519728/how-do-you-register-custom-pipes-in-angular-17
@Pipe({
  name: 'UserType',
  standalone: true,
})
export class UserTypePipe implements PipeTransform {

  transform(value?: number): string {
    switch (value) {
      case 0:
        return 'Admin';
      case 1:
        return 'Vendedor';
      default:
        return 'Nulo/Desconocido'; // Para otros valores que puedan existir
    }
  }

}
