export class ConfigEnv {
    // Atributos estáticos - Entornos
    static readonly DEVELOPMENT: string = 'https://localhost:7099';
    static readonly PRODUCTION: string = 'https://localhost:5001';

    // Esta variable configura la url de consultas hacia la API
    static readonly ENVIRONMENT: string = this.DEVELOPMENT;
}