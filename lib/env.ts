import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1),

  // Application
  NEXT_PUBLIC_MINIMUM_DONATION: z.string().transform(Number),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),

  // Email
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.string().transform(Number),
  SMTP_USER: z.string().email(),
  SMTP_PASSWORD: z.string().min(1),
  SMTP_FROM: z.string().email(),
  SMTP_SECURE: z.string().transform((v) => v === 'true'),

  // Web3
  NEXT_PUBLIC_NETWORK_ID: z.string(),
  NEXT_PUBLIC_NETWORK_NAME: z.string(),
  NEXT_PUBLIC_RPC_URL: z.string().url(),

  // Rate Limiting
  MAX_LOGIN_ATTEMPTS: z.string().transform(Number),
  LOGIN_ATTEMPT_WINDOW: z.string().transform(Number),

  // Security
  JWT_SECRET: z.string().min(32),
  PASSWORD_SALT_ROUNDS: z.string().transform(Number),
  SESSION_EXPIRY: z.string(),
  COOKIE_SECRET: z.string().min(32),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_EMAIL_VERIFICATION: z.string().transform((v) => v === 'true'),
  NEXT_PUBLIC_ENABLE_PASSWORD_RESET: z.string().transform((v) => v === 'true'),
  NEXT_PUBLIC_MAINTENANCE_MODE: z.string().transform((v) => v === 'true'),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;