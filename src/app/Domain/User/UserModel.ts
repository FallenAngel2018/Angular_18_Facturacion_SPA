
// export type UserModel = {
//     IdUsuario?: number;
//     Nombre?: String;
//     NombreUsuario?: String;
//     ClaveUsuario?: String;
//     Tipousuario?: number;
// };


export class UserModel {
    IdUsuario?: number;
    Nombre?: String;
    NombreUsuario?: String;
    ClaveUsuario?: String;
    TipoUsuario?: number;

    constructor(idUsuario: number, nombre: String, nombreUsuario: String, claveUsuario: String, tipoUsuario: number) {
        this.IdUsuario = idUsuario;
        this.Nombre = nombre;
        this.NombreUsuario = nombreUsuario;
        this.ClaveUsuario = claveUsuario;
        this.TipoUsuario = tipoUsuario;
    }

    

}


