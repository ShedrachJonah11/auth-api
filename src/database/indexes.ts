import { Connection } from 'mongoose';

export async function createIndexes(connection: Connection) {
  const userCollection = connection.collection('users');
  
  // Create indexes for better query performance
  await userCollection.createIndex({ email: 1 }, { unique: true });
  await userCollection.createIndex({ role: 1 });
  await userCollection.createIndex({ isEmailVerified: 1 });
  await userCollection.createIndex({ createdAt: -1 });
  await userCollection.createIndex({ resetPasswordToken: 1 });
  await userCollection.createIndex({ emailVerificationToken: 1 });
  
  // Compound indexes for common queries
  await userCollection.createIndex({ role: 1, isEmailVerified: 1 });
  await userCollection.createIndex({ email: 1, isEmailVerified: 1 });
  
  console.log('Database indexes created successfully');
}
