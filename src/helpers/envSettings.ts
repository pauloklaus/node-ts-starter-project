type EnvSettings = {
  appName: string;
  rateLimitInMs: number;
  rateLimitMaxRequests: number;
  corsAllowedOrigin: string;
  serverPort: string;
  jwtSecretKey: string;
  cookieSessionName: string;
  accessTokenExpirationInMs: number;
  logLevel: string;
  dbHost: string;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbPoolSize: number;
  awsRegion: string;
  senderMailAddress: string;
  slackWebhook: string;
  otelCollector: string;
};

export function envSettings(): EnvSettings {
  return {
    appName: process.env.APP_NAME ?? "",
    rateLimitInMs: Number(process.env.RATE_LIMIT_IN_MS ?? 60000),
    rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 100),
    corsAllowedOrigin: process.env.CORS_ALLOWED_ORIGIN ?? "*",
    serverPort: process.env.SERVER_PORT ?? "8080",
    jwtSecretKey: process.env.JWT_SECRET_KEY ?? "",
    cookieSessionName: process.env.COOKIE_SESSION_NAME ?? "",
    accessTokenExpirationInMs: Number(process.env.ACCESS_TOKEN_EXPIRATION_IN_MS ?? 14400),
    logLevel: process.env.LOG_LEVEL ?? "info",
    dbHost: process.env.DB_HOST ?? "",
    dbName: process.env.DB_NAME ?? "",
    dbUser: process.env.DB_USER ?? "",
    dbPassword: process.env.DB_PASSWORD ?? "",
    dbPoolSize: Number(process.env.DB_POOL_SIZE ?? 4),
    otelCollector: process.env.OTEL_COLLECTOR ?? "",
    slackWebhook: process.env.SLACK_WEBHOOK ?? "",
    awsRegion: process.env.AWS_REGION ?? "us-east-1",
    senderMailAddress: process.env.SENDER_MAIL_ADDRESS ?? "no-response@domain.com",
  };
}
