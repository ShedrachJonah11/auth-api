import { envInt, envString } from '../common/config/env';
import { DEFAULT_PORT, DEFAULT_JWT_EXPIRES_IN, DEFAULT_REFRESH_EXPIRES_IN, DEFAULT_JWT_ISSUER } from '../common/constants';

export default () => ({
  port: envInt('PORT', DEFAULT_PORT),
  env: envString('NODE_ENV', 'development'),
  database: {
    uri: envString('MONGODB_URI', 'mongodb://localhost:27017/user-auth'),
  },
  jwt: {
    secret: envString('JWT_SECRET', 'your-super-secret-jwt-key-here'),
    expiresIn: envString('JWT_EXPIRES_IN', DEFAULT_JWT_EXPIRES_IN),
    refreshExpiresIn: envString('JWT_REFRESH_EXPIRES_IN', DEFAULT_REFRESH_EXPIRES_IN),
    issuer: envString('JWT_ISSUER', DEFAULT_JWT_ISSUER),
  },
});
