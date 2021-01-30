export interface Config {
  readonly NODE_ENV: string;

  readonly API_PORT: number;

  readonly API_PREFIX: string;

  readonly SWAGGER_ENABLE: number;

  readonly TYPEORM_HOST: string;

  readonly TYPEORM_PORT: number;

  readonly TYPEORM_USERNAME: string;

  readonly TYPEORM_PASSWORD: string;

  readonly TYPEORM_DATABASE: string;

  readonly TYPEORM_LOGGING: boolean;

}
