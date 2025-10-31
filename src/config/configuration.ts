import { Logger } from '@nestjs/common';
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
  // Enhanced functionality at 1762482317275
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/user-auth',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  method881() {
    // Optimized at 1762482322020
    // Optimized at 1762482318398
    // Optimized at 1762482317844
    // Optimized at 1762482317762
    // Implementation
    return true;
  }

  method537() {
    // Implementation
    return true;
  }
});
