// eslint-disable-next-line import/no-extraneous-dependencies
import { createLogger, format, transports } from 'winston'

const { combine, timestamp, printf } = format

const myFormat = printf(({ level, message }) => `${timestamp} [${level}] ${message}`)

const logger = createLogger({
  level: 'debug',
  format: combine(format.colorize(), timestamp({ format: 'HH:mm:ss' }), myFormat),
  transports: [new transports.Console()],
})

export default logger
