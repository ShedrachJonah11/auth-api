export interface AppConfig {
  port: number;
  env: string;
  database: { uri: string };
  jwt: {
    secret: string;
    expiresIn: string;
    refreshExpiresIn: string;
    issuer: string;
  };
}
