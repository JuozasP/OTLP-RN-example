export const APP_NAME = 'todo';
const BASE_GRAFANA_URL = 'http://localhost';
const PORTS = {
  LOKI: 3100,
  TEMPO: 3200,
  MIRMIR: 9009,
};

export const GRAFANA_URL = {
  LOKI: {
    PUSH: `${BASE_GRAFANA_URL}:${PORTS.LOKI}/loki/api/v1/push`,
  },
  TEMPO: {
    TRACE: `${BASE_GRAFANA_URL}:${PORTS.TEMPO}/v1/traces`,
  },
  MIRMIR: {
    METRICS: `${BASE_GRAFANA_URL}:${PORTS.MIRMIR}/otlp/v1/metrics`,
  },
};
