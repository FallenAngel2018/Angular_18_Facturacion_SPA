import { EnvDeployUrls } from "./EnvDeployUrls";

export class ConfigEnv {
    static readonly DEVELOPMENT: string = 'https://localhost:7099';
    static readonly PRODUCTION: string = 'https://localhost:5001';

    // Atributos estáticos
    static readonly ENVIRONMENT: string = this.PRODUCTION;

}