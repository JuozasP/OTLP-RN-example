import {GRAFANA_URL} from './constants';

export enum LogLevel {
  info = 'info',
  error = 'error',
}

export enum LogAction {
  delete = 'delete',
  create = 'create',
  rename = 'rename',
  complete = 'complete',
  uncomplete = 'uncomplete',
}

export const logLokiAction = async ({
  level = LogLevel.info,
  values = [],
  action,
}: {
  level?: LogLevel;
  values?: string[];
  action: LogAction;
}) => {
  await fetch(GRAFANA_URL.LOKI.PUSH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      streams: [
        {
          stream: {action, level},
          values: [[`${Date.now()}000000`, ...values]],
        },
      ],
    }),
  });
};
