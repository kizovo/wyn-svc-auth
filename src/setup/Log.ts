import config from '@/config'
import * as Sentry from '@sentry/browser'

export default class Log {
  constructor() {
    Sentry.init({
      environment: config.APP_ENV,
      dsn: config.SENTRY_DSN,
      tracesSampleRate: 1.0,
    })
  }

  captureException(e: unknown) {
    return Sentry.captureException(e as Sentry.Exception)
  }
}
