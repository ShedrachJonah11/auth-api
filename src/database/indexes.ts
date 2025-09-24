import { Model } from 'mongoose';

export async function createIndexes(userModel: Model<any>) {
  try {
    // Create indexes for better query performance
    await userModel.collection.createIndex({ email: 1 }, { unique: true });
    await userModel.collection.createIndex({ username: 1 }, { unique: true, sparse: true });
    await userModel.collection.createIndex({ createdAt: -1 });
    await userModel.collection.createIndex({ updatedAt: -1 });
    await userModel.collection.createIndex({ role: 1 });
    await userModel.collection.createIndex({ isEmailVerified: 1 });
    await userModel.collection.createIndex({ resetPasswordToken: 1 }, { sparse: true });
    await userModel.collection.createIndex({ emailVerificationToken: 1 }, { sparse: true });
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating database indexes:', error);
  }
}
