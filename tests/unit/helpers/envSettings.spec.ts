import { envSettings } from "@/helpers";

describe("envSettings.ts", () => {
  test("should return default values", () => {
    const settings = envSettings();

    expect(settings.appName).toBe("");
    expect(settings.rateLimitInMs).toBe(60_000);
    expect(settings.rateLimitMaxRequests).toBe(100);
    expect(settings.corsAllowedOrigin).toBe("*");
    expect(settings.serverPort).toBe("8080");
    expect(settings.jwtSecretKey).toBe("");
    expect(settings.cookieSessionName).toBe("");
    expect(settings.accessTokenExpirationInMs).toBe(14400);
    expect(settings.logLevel).toBe("info");
    expect(settings.dbHost).toBe("");
    expect(settings.dbName).toBe("");
    expect(settings.dbUser).toBe("");
    expect(settings.dbPassword).toBe("");
    expect(settings.dbPoolSize).toBe(4);
    expect(settings.otelCollector).toBe("");
    expect(settings.slackWebhook).toBe("");
    expect(settings.awsRegion).toBe("us-east-1");
    expect(settings.senderMailAddress).toBe("no-response@domain.com");
  });

  test("should return custom appName", () => {
    process.env.APP_NAME = "App Test";
    const settings = envSettings();

    expect(settings.appName).toBe(process.env.APP_NAME);
  });

  test("should return custom rateLimitInMs", () => {
    process.env.RATE_LIMIT_IN_MS = "30000";
    const settings = envSettings();

    expect(settings.rateLimitInMs).toBe(30_000);
  });

  test("should return custom rateLimitMaxRequests", () => {
    process.env.RATE_LIMIT_MAX_REQUESTS = "500";
    const settings = envSettings();

    expect(settings.rateLimitMaxRequests).toBe(500);
  });

  test("should return custom corsAllowedOrigin", () => {
    process.env.CORS_ALLOWED_ORIGIN = "10.0.0.1";
    const settings = envSettings();

    expect(settings.corsAllowedOrigin).toBe(process.env.CORS_ALLOWED_ORIGIN);
  });

  test("should return custom serverPort", () => {
    process.env.SERVER_PORT = "8080";
    const settings = envSettings();

    expect(settings.serverPort).toBe(process.env.SERVER_PORT);
  });

  test("should return custom jwtSecretKey", () => {
    process.env.JWT_SECRET_KEY = "500";
    const settings = envSettings();

    expect(settings.jwtSecretKey).toBe(process.env.JWT_SECRET_KEY);
  });

  test("should return custom cookieSessionName", () => {
    process.env.COOKIE_SESSION_NAME = "CookieTest";
    const settings = envSettings();

    expect(settings.cookieSessionName).toBe(process.env.COOKIE_SESSION_NAME);
  });

  test("should return custom accessTokenExpirationInMs", () => {
    process.env.ACCESS_TOKEN_EXPIRATION_IN_MS = "300";
    const settings = envSettings();

    expect(settings.accessTokenExpirationInMs).toBe(300);
  });

  test("should return custom logLevel", () => {
    process.env.LOG_LEVEL = "debug";
    const settings = envSettings();

    expect(settings.logLevel).toBe(process.env.LOG_LEVEL);
  });

  test("should return custom dbHost", () => {
    process.env.DB_HOST = "10.0.0.2";
    const settings = envSettings();

    expect(settings.dbHost).toBe(process.env.DB_HOST);
  });

  test("should return custom dbName", () => {
    process.env.DB_NAME = "db-test";
    const settings = envSettings();

    expect(settings.dbName).toBe(process.env.DB_NAME);
  });

  test("should return custom dbUser", () => {
    process.env.DB_USER = "user-test";
    const settings = envSettings();

    expect(settings.dbUser).toBe(process.env.DB_USER);
  });

  test("should return custom dbPassword", () => {
    process.env.DB_PASSWORD = "password-test";
    const settings = envSettings();

    expect(settings.dbPassword).toBe(process.env.DB_PASSWORD);
  });

  test("should return custom dbPoolSize", () => {
    process.env.DB_POOL_SIZE = "50";
    const settings = envSettings();

    expect(settings.dbPoolSize).toBe(50);
  });

  test("should return custom otelCollector", () => {
    process.env.OTEL_COLLECTOR = "10.0.0.3";
    const settings = envSettings();

    expect(settings.otelCollector).toBe(process.env.OTEL_COLLECTOR);
  });

  test("should return custom slackWebhook", () => {
    process.env.SLACK_WEBHOOK = "https://localhost/webhook-test";
    const settings = envSettings();

    expect(settings.slackWebhook).toBe(process.env.SLACK_WEBHOOK);
  });

  test("should return custom awsRegion", () => {
    process.env.AWS_REGION = "us-east-2";
    const settings = envSettings();

    expect(settings.awsRegion).toBe(process.env.AWS_REGION);
  });

  test("should return custom senderMailAddress", () => {
    process.env.SENDER_MAIL_ADDRESS = "notice@test-domain.com";
    const settings = envSettings();

    expect(settings.senderMailAddress).toBe(process.env.SENDER_MAIL_ADDRESS);
  });
});
