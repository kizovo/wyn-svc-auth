// Put all configuration value from .env file here to centralized config.
// Benefit: load only once, easier for future env key-value changes

const config = {
  APP_ENV: process.env.APP_ENV,
  APP_NAME: process.env.APP_NAME,
  APP_PORT: process.env.APP_PORT,
  SENTRY_DSN: process.env.SENTRY_DSN,
}

export default config;
