/**
 * @copyright 2025 KidCoderClub
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import mongoose from 'mongoose';

/**
 * Config modules
 */
import config from '@/config';
import { logger } from '@/lib/winston';

/**
 * Types
 */
import type { ConnectOptions } from 'mongoose';

/**
 * Client option
 */
const clientOptions: ConnectOptions = {
  dbName : 'kidcoderclub-db',
  appName: 'KidCoderClub API',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

export const connectToDatabase = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error('MongoDB URI is not defined in the configuration.');
  }
  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);

    logger.warn('Connected to database successfully.', {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }

    logger.error('Error connecting to the database:', err);
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();

    logger.warn('Disconnected from database successfully.', {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }

    logger.error('Error disconnecting from the database:', err);
  }
};
