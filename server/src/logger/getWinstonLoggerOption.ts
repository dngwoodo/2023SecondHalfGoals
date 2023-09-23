import { format, LoggerOptions, transports } from 'winston';
import { getTransactionId } from './ClsRequestTracer';

/**
 * debug -> info -> error
 */

export function getWinstonLoggerOption(
  moduleName: string,
  nodeEnv = process.env.NODE_ENV,
): LoggerOptions {
  const isLocalEnv = ['local-dev', 'local', 'test', undefined].includes(
    nodeEnv,
  );
  const level = isLocalEnv ? 'debug' : 'info';

  return {
    silent: nodeEnv === 'test' || nodeEnv === 'ci',
    transports: [
      new transports.Console({
        level: level,
        format: isLocalEnv ? getLocalFormat() : getProductionFormat(moduleName),
      }),
    ],
  };
}

function getLocalFormat() {
  return format.combine(
    format.printf(
      ({ message, stack }) =>
        `[transactionId: ${getTransactionId()}] ${[message, stack]
          .filter(Boolean)
          .join('\n')}`,
    ),
  );
}

function getProductionFormat(moduleName: string) {
  return format.combine(
    format.label({ label: `[${moduleName}]` }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.ms(),
    format.json(),
    format.printf(({ level, ...args }) =>
      JSON.stringify({
        level,
        transactionId: getTransactionId(),
        status: level,
        ...args,
      }),
    ),
  );
}
