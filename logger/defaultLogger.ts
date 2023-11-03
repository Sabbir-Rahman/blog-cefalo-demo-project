// eslint-disable-next-line import/no-extraneous-dependencies
import { createLogger, format, transports } from 'winston'

const { combine, timestamp } = format

const logger = createLogger({
  level: 'debug',
  format: combine(format.colorize(), timestamp({ format: 'HH:mm:ss' }), format.simple()),
  transports: [new transports.Console()],
})

export default logger
