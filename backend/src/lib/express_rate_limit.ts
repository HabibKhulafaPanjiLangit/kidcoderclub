/**
 * @copyright 2025 KidCoderClub
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { error } from 'console';
import {rateLimit} from 'express-rate-limit';

// Configure rate limiting middleware to prevent abuse
const limiter = rateLimit({
  windowMs: 60000, // 1 minute window for request limiting
  limit: 60, // limit each IP to 60 requests per windowMs
  standardHeaders: 'draft-8', // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: 'You have sent too many requests in a given amount of time. Please try again later.',
  },
});

export default limiter;
