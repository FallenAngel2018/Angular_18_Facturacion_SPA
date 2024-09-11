import { Pipe, PipeTransform } from '@angular/core';
import { UserTypes } from '../../../../Utils/UserTypes';


// Fuente: https://stackoverflow.com/questions/77519728/how-do-you-register-custom-pipes-in-angular-17
@Pipe({
  name: 'UserType',
  standalone: true,
  // Fuente: https://medium.com/@aqeelabbas3972/pipes-in-angular-6a871589299d
  // Impure pipes can be useful in some cases, such as when you need to perform a heavy calculation
  // or retrieve data from an external API.
  pure: true,
})
export class UserTypePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case UserTypes.Admin:
        return 'Admin';
      case UserTypes.Vendedor:
        return 'Vendedor';
      default:
        return 'Nulo/Desconocido'; // Por si llega un valor que no está en el enum
    }
  }

}
