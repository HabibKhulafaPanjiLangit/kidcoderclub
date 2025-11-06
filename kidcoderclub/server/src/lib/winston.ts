/**
 * @copyright 2025 KidCoderClub
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import winston from 'winston';

/**
 * Coustom modules
 */
import config from '@/config';

const { combine, timestamp, json, errors, align, printf, colorize } = winston.format;

// mendefinisikan array transports dalam menunggu perpedaan logging transports
const transports: winston.transport[] = [];

// jika aplikasi tidak berjalan di produksi, menambahkan console transport
if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // Menambahkan warna pada semua bagian log
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss A' }), //Menambahkan timestamp
        align(), // Align log messages
        printf(({ timestamp, level, message, ... meta }) => {
          const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta)}` : '';

          return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`;
        }),
      ),
    }),
  );
 
};

// Membuat sebuah logger instance dengan winston
const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info', // level log default toinfo
  format: combine(timestamp(), errors({ stack: true }), json()), // format log dalam JSON untuk pesan log
  transports, // array transports yang telah didefinisikan sebelumnya
  silent: config.NODE_ENV === 'test', // Menonaktifkan logging saat dalam mode test
});

export { logger };